---
layout: post
title: Apache optimization for a map server
date: 2014-03-17
description: "The previous article covered most of the basics installing a simple Apache web server. With a working web server setup, you can make more specific considerations for a map server. There are simpler cases, like what kind of content you would like to serve or what kind of scripts and programs you will need. If you don't want an audiovisual wonder with something like flash, then the content mostly will consist of images and plain text. On the scripting side you will surely need JavaScript and Python. You may use some kind of shellscript on your way to build a map server, but you don't have to put any extra effort in optimizing that part. A bit more complicated list of considerations are, how to optimize the web server itself. You have to choose and set up the best MPM, set up privileges to various directories, choose the modules you have to use and throw away the unwanted ones, all in all, fine-tune the whole system."
comments: true
---
The previous article covered most of the basics installing a simple Apache web server. With a working web server setup, you can make more specific considerations for a map server. There are simpler cases, like what kind of content you would like to serve or what kind of scripts and programs you will need. If you don’t want an audiovisual wonder with something like flash, then the content mostly will consist of images and plain text. On the scripting side you will surely need JavaScript and Python. You may use some kind of shellscript on your way to build a map server, but you don’t have to put any extra effort in optimizing that part. A bit more complicated list of considerations are, how to optimize the web server itself. You have to choose and set up the best MPM, set up privileges to various directories, choose the modules you have to use and throw away the unwanted ones, all in all, fine-tune the whole system.

### Choosing and optimizing the MPM

MPM stands for Multi-Processing Module in Apache. It is a special module, which function is to manage the processes started by the Apache daemon. The active MPM defines the behaviour of the web server, so you have to choose wisely. There were two main MPMs back in the day: prefork and worker. Prefork was the stable and secure one with thread-safe child processes, but it took more system resources than worker. Now worker is secure, too, but it uses threads instead of child processes, which can utilize system resources better via sharing objects among threads. You only have to watch out for non thread-safe modules, like `mod_php`, which can be replaced with `mod_fcgi` and `php5_cli` on Debian or php_cli on Fedora.

If you want to be able to choose wisely between MPMs, you may want to understand the concept behind some of them. When the MPM worker starts up, it creates some child process servers and some spare threads. One of the thread is the listener, its purpose is to listen for requests. When it gets one, it passes it down to one of the spare threads. The threads work is only done, when it returns the result of the request or the request times out. One child server can only spawn a given number of server threads, defined in the configuration file. When a child servers threads are all dead, the Apache daemon terminates the child server and creates a new one. When the server has some idle time, it creates spare threads to speed up the serving time of the upcoming requests.

That was the operation of the worker MPM in a nutshell. There is a little brother of the worker, called event, you may take into consideration. The event MPM is a thread based module, too. The only difference is, that while the worker always creates some spare child servers and threads in advance, the event only activates when there is an active request. If you plan a server with low traffic, but high load, then event might suit you better than worker. In all other cases, worker is a good choice.

Now that you have your preferred MPM, you have to configure it. For MPMs are modules, it can be configured in the corresponding `IfModule` section. In Debian, most of the module configurations come in separate .conf files in the **/etc/apache2/modules-available/** directory. However because there can be only one MPM present at a time, the MPM configurations are in the main configuration file in Debian, too. In Fedora some `IfModule` directives can be found in the main configuration file and the others can be accessed via **/etc/httpd/conf.modules.d/** Let’s see the default layout of the worker configuration in Debian 7:

``` bash
 <IfModule mpm_worker_module>  
   StartServers     2  
   MinSpareThreads   25  
   MaxSpareThreads   75   
   ThreadLimit     64  
   ThreadsPerChild   25  
   MaxClients     150  
   MaxRequestsPerChild  0  
 </IfModule>  
```

It says that the Apache daemon will create two child servers at startup. The child servers will spawn 25-75 idle threads at all, but there can be only 64 thread at a moment. Every child can create up to 25 threads before terminated and 150 clients can send request to the server at any time. There isn’t any limit to the maximum request a child can process. As you can see, there is a clash in the two hard limits of `ThreadLimit` and `MaxClients`. Luckily, `ThreadLimit` isn’t necessary in the configuration, so let’s just delete it. There is one directive you may want to change, the `MaxClients`. There are two main limits in every server configuration you don’t want to overpass, the size of the memory and the bandwidth. You can say that the memory is the lesser limit, but no, if the server changes to swap memory, the responses will be so slow, the clients won’t wait for it or eventually time out.

When calculating the ideal number of maximum clients, you should consider the bandwidth divided by the size of an average map tile or if you want to avoid any chance of server lag, the bandwidth divided by the size of the biggest map tile multiplied by the number of tiles an extend consists (bw/(size*num)), but I think that would be a waste of resources. The other consideration you may make is the available physical memory after startup divided by the size of a child server. You can look up these information with the following commands:

``` bash
 debian@mapserver:~$ free -m  
              total    used    free   shared  buffers   cached  
 Mem:          5945    2380    3564        0      127      771  
 -/+ buffers/cache:    1481    4464  
 Swap:            0       0       0  
 debian@mapserver:~$ ps -C apache2 v  
  PID  TTY  STAT  TIME MAJFL  TRS   DRS   RSS %MEM COMMAND  
  8440 ?    Ss    0:00     0    0 77444  4564  0.0 /usr/sbin/apache2 -k st  
  8444 ?    S     0:00     0    0 76000  2320  0.0 /usr/sbin/apache2 -k st  
  8446 ?    S     0:00     0    0 77160  2152  0.0 /usr/sbin/apache2 -k st  
  8449 ?    Sl    0:00     0    0 300880 2972  0.0 /usr/sbin/apache2 -k st  
  8450 ?    Sl    0:00     0    0 300872 2976  0.0 /usr/sbin/apache2 -k st  
```

I’ve got 3564 MB available memory space and my average server size is 3 MB. That means, I could server 1000+ requests at once. However if I count with 10 MB/s bandwidth and my average tile size of 100 KB, I could only serve 100 requests at once, so the value of my `MaxClients` directive will be only 100.

### Choosing the right modules

Initially Apache is quite a heavy web server. It supports a bunch of programming styles, formats and frameworks via modules. The bad thing is, it has to load all of its active modules into memory. So if you activate modules you won’t actually use, you waste a lot of memory space needlessly. You have to choose the modules you need and strip down the server as you can. Most of the modules are Dynamically Shared Objects (DSOs), so if you will need some of them in the future, you can enable the corresponding ones and activate them with a server restart.

If you don’t have a specific module in Debian, you can download it from a repository. They can be found as libapache2-mod-xy. You can take a look at your currently active modules with the command `apache2ctl -M`. If you want to enable a module, you can do it with `a2enmod`, and you can disable modules with a2dismod. The command a2enmod creates a symlink to **/etc/apache2/mods-enabled/** pointing at the original module file. With every server restart, the Apache daemon loads the modules which are present in the mods-enabled folder. The currently enabled modules in my server are the following:

``` bash
 root@mapserver:~# apache2ctl -M  
 Loaded Modules:  
  core_module (static)  
  log_config_module (static)  
  logio_module (static)  
  version_module (static)  
  mpm_worker_module (static)  
  http_module (static)  
  so_module (static)  
  alias_module (shared)  
  auth_basic_module (shared)  
  authn_file_module (shared)  
  authz_default_module (shared)  
  authz_host_module (shared)  
  authz_user_module (shared)  
  autoindex_module (shared)  
  cgi_module (shared)  
  deflate_module (shared)  
  dir_module (shared)  
  expires_module (shared)  
  fcgid_module (shared)  
  headers_module (shared)  
  mime_module (shared)  
  negotiation_module (shared)  
  proxy_module (shared)  
  rewrite_module (shared)  
  setenvif_module (shared)  
 Syntax OK  
```

In a Fedora system, loading modules is slightly different. You can check the currently active modules with the command `httpd -M`, but you don’t have any for enabling or disabling modules. You have to do it manually by commenting out and uncommenting LoadModule directives in configuration files. Most of the module related configuration files can be found in **/etc/httpd/conf.modules.d/**. If you want to install a new module, you can download it from a repository as mod_xy. Just be sure it is a module for the Apache server (you can check it in the package description).

For more information about module choosing considerations there are various very useful articles on the internet, like [this one](https://haydenjames.io/strip-apache-improve-performance-memory-efficiency/) by Hayden James. Of course you can look up every module you are not sure about in the official [Apache documentation](https://httpd.apache.org/docs/2.2/), they have great examples, too.

### Setting up the virtual server

Now that you have your modules configured correctly, you can proceed on setting up a virtual server. Virtual servers contain configuration options relevant to your servers attributes and file hierarchy. It can be in a separate configuration file or in the main configuration based on your distribution. Note that the Apache 2.2 and 2.4 virtual host configurations are slightly different. A layout in a Debian system can look like this:

``` bash
 <VirtualHost *:80>  
     ServerAdmin webmaster@localhost  
     ServerName localhost  
   
     DocumentRoot /var/www  
     <Directory />  
         Options FollowSymLinks  
         AllowOverride None  
         Order deny,allow  
         deny from all  
     </Directory>  
     <Directory /var/www/>  
         Options Indexes FollowSymLinks MultiViews  
         AllowOverride None  
         Order allow,deny  
         allow from all  
     </Directory>  
     ScriptAlias /cgi-bin /var/www/cgi-bin/  
     <Directory "/var/www/cgi-bin/">  
         AddHandler fcgid-script .php  
         FCGIWrapper /usr/lib/cgi-bin/php5 .php  
         AllowOverride None  
         Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch  
         Order allow,deny  
         Allow from all  
     </Directory>  
   
     ErrorLog ${APACHE_LOG_DIR}/error.log  
   
     # Possible values include: debug, info, notice, warn, error, crit,  
     # alert, emerg.  
     LogLevel warn  
   
     CustomLog ${APACHE_LOG_DIR}/access.log combined  
 </VirtualHost>  
```

I’ve covered most of the directives in the previous article, so I’ll just write about the `Directory` part. You have to define every directory in the virtual server section you want Apache to handle differently. Every definition is recursive and enforced until the next directive, so if you deny all access from root, but you allow accessing **/usr**, then Apache can’t access **/home**, but can access **/usr/bin** for example. The default directories are **/**, **/var/www** and **/usr/lib/cgi-bin**. As default in Debian, Apache wants to put all the cgis in **/usr/lib/cgi-bin**, so I modified the ScriptAlias directive to point at **/var/www/cgi-bin**. Note that in ScriptAlias you must put a slash after cgi-bin, while in a Directory declaration you don’t have to. The first Directory section (from now on section) is the root directory. You have to prohibit Apache to access your system configuration and directories and you can do so, by denying all access to root. The next section is **www**. This will be the actual place of your website. You have to grant access to it. The last section is the **cgi-bin** directory. The most important option here is the `ExecCGI`. Without it, the Apache daemon won’t know that the contained files are scripts, so it just prints out their content. You can add additional handlers and wrappers for third party frameworks, like in my case, PHP.

In Fedora by default there aren’t any virtual host sections. The settings of the default virtual host are scattered through the main configuration file. If you don’t want to make a server listening to various ports, or make differently behaving virtual servers, this setup will do good enough. In Apache 2.4 `Order` and `Allow` directives have been replaced with a single one: `Require`. It can be `Require all granted`, `Require all denied` or `Require host x.y`. Note that in Fedora, the default DocumentRoot folder is **/var/www/httpd**, so there are four sections by default.

### Configuring SELinux for Apache 2.4 in Fedora 20

In the newer Fedora systems there is a built-in feature, SELinux. It stands for Security Enhanced Linux and is developed by the NSA. Its main purpose to give an additional security layer by controlling daemon behaviors with politics and file contexts. Every file gets another metadata, the file context, and it defines if a specific daemon, like httpd can access it or not.

The easiest way to get around SELinux is to disable it. I don’t recommend it however, because I assume you didn’t choose Fedora for its mere beauty. Completely disabling a security layer compiled in the kernel can be dangerous. If you want to disable it anyway, you can do it by editing its config file which can be accessed via **/etc/selinux/config**. You have to replace the value enforcing with permissive or disabled.

If you want to configure SELinux properly, first you may want to check the values of the SELinux boolean settings:

``` bash
 [root@mapserver fedora]# semanage boolean -l | grep httpd  
 httpd_can_network_relay        (off , off) Allow httpd to can network relay  
 httpd_can_connect_mythtv       (off , off) Allow httpd to can connect mythtv  
 httpd_can_network_connect_db   (off , off) Allow httpd to can network connect db  
 httpd_use_gpg                  (off , off) Allow httpd to use gpg  
 httpd_enable_cgi               (on  ,  on) Allow httpd to enable cgi  
 httpd_verify_dns               (off , off) Allow httpd to verify dns  
 httpd_anon_write               (off , off) Allow httpd to anon write  
 httpd_use_cifs                 (off , off) Allow httpd to use cifs  
 httpd_enable_homedirs          (off , off) Allow httpd to enable homedirs  
 httpd_unified                  (off , off) Allow httpd to unified  
 httpd_mod_auth_pam             (off , off) Allow httpd to mod auth pam  
 httpd_run_stickshift           (off , off) Allow httpd to run stickshift  
 httpd_use_fusefs               (off , off) Allow httpd to use fusefs  
 httpd_can_connect_ldap         (off , off) Allow httpd to can connect ldap  
 httpd_can_network_connect      (on  ,  on) Allow httpd to can network connect  
 httpd_mod_auth_ntlm_winbind    (off , off) Allow httpd to mod auth ntlm winbind  
 httpd_use_sasl                 (off , off) Allow httpd to use sasl  
 httpd_tty_comm                 (off , off) Allow httpd to tty comm  
 httpd_sys_script_anon_write    (off , off) Allow httpd to sys script anon write  
 httpd_graceful_shutdown        (on  ,  on) Allow httpd to graceful shutdown  
 httpd_can_connect_ftp          (off , off) Allow httpd to can connect ftp  
 httpd_read_user_content        (off , off) Allow httpd to read user content  
 httpd_use_nfs                  (off , off) Allow httpd to use nfs  
 httpd_can_connect_zabbix       (off , off) Allow httpd to can connect zabbix  
 httpd_tmp_exec                 (off , off) Allow httpd to tmp exec  
 httpd_manage_ipa               (off , off) Allow httpd to manage ipa  
 httpd_can_sendmail             (off , off) Allow httpd to can sendmail  
 httpd_builtin_scripting        (on  ,  on) Allow httpd to builtin scripting  
 httpd_dbus_avahi               (off , off) Allow httpd to dbus avahi  
 httpd_can_check_spam           (off , off) Allow httpd to can check spam  
 httpd_can_network_memcache     (off , off) Allow httpd to can network memcache  
 httpd_can_network_connect_cobbler (off , off) Allow httpd to can network connect cobbler  
 httpd_serve_cobbler_files      (off , off) Allow httpd to serve cobbler files  
 httpd_execmem                  (off , off) Allow httpd to execmem  
 httpd_ssi_exec                 (off , off) Allow httpd to ssi exec  
 httpd_use_openstack            (off , off) Allow httpd to use openstack  
 httpd_enable_ftp_server        (off , off) Allow httpd to enable ftp server  
 httpd_setrlimit                (off , off) Allow httpd to setrlimit  
```

There are several options you can make your life easier with SELinux. Check the `httpd_enable_cgi` option, if it is disabled, then you must enable it before you can execute cgi scripts. There is another interesting option, the `httpd_unified` one. If you turn it on, then SELinux won’t make difference in script, content, access and write contexts. You can turn it on with the `setsebool -P httpd_unified 1` command. Be cautious, because with unifying the httpd contexts, you lose a security layer. The only thing left to do is to mark all the directories as `httpd` contents that haven’t been marked by default. In my case this folder is **/var/www** and the procedure is the following:

``` bash
 [root@mapserver ~]# semanage fcontext -a -t httpd_sys_content_t "/var/www"
 [root@mapserver ~]# restorecon /var/www  
```

If you want to take the harder way and keep all the SELinux security possibilities, then you have edit the file context of the directories you want Apache to get access to with their contents. There are four main contexts you have to know about. The first is the default `httpd_sys_content_t`. Files labelled with it, can be accessed by `httpd`, but cannot be written or executed. The second is `httpd_sys_script_exec_t`. It labels the executable scripts and their containing folder(s). The other two are special contexts. The `httpd_sys_ra_content_t` label marks files and folders the httpd daemon have access and append rights to, while the `httpd_sys_rw_content_t` label grants full writing access for httpd.

There are two ways to relabel your web content. If you are not sure what label should be given to the files and folders, you can use the `chcon` command (`chcon -t httpd_sys_content_t /var/www` for example). Then the original context can be restored with the restorecon command. If you are 100% sure about what are you doing, you can change the context of the web content permanently with the semanage tool. After using it, you have to run the restorecon command to finalize the changes. Let’s see an example where is a **/var/www** `DocumentRoot`, a **/var/www/cgi-bin** script folder, a **/var/www/httpd** folder with appending rights and a **/var/www/img** folder with full access:

``` bash
 [root@mapserver ~]# semanage fcontext -a -t httpd_sys_content_t "/var/www(/.*)?"  
 [root@mapserver ~]# semanage fcontext -a -t httpd_sys_script_exec_t "/var/www/cgi-bin"  
 [root@mapserver ~]# semanage fcontext -a -t httpd_sys_ra_content_t "/var/www/httpd"  
 [root@mapserver ~]# semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/img"  
 [root@mapserver ~]# restorecon -Rv /var/www  
```

You can check the options and flags for these commands at the corresponding man pages (`man restorecon`, `man 8 semanage-fcontext`).

Congratulations! Now that you have configured your web server, you can check it with an **index.html** in the `DocumentRoot` and maybe some scripts in the **cgi-bin**. This is a simple “Hello World” shell script:

``` bash
 #! /bin/bash  
    
 echo "Content-type: text/html"  
 echo ""  
 echo '<html>'  
 echo '<head>'  
 echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'  
 echo '<title>Hello World</title>'  
 echo '</head>'  
 echo '<body>'  
 echo 'Hello World'  
 echo '</body>'  
 echo '</html>'  
    
 exit 0  
```

