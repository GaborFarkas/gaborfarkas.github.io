---
layout: post
title: Creating an Apache web server
date: 2014-03-03
description: "Now that you have a working Linux distribution on a server computer it’s time to initialize a web server framework. The Apache 2 is a Hypertext Transfer Protocol web server program. It is highly optimizable and modular. This article will help you through the installation process of Apache 2.2 on Debian 7 and Apache 2.4 on Fedora 20. The default layout and command usage in those distributions are slightly different. In the first place I will show some general configuration options, then I’ll continue with the distribution specific installation process. Note that some dissimilarities come from the different distributions, but some of them are simply because version version differences."
comments: true
---
Now that you have a working Linux distribution on a server computer it’s time to initialize a web server framework. The Apache 2 is a Hypertext Transfer Protocol web server program. It is highly optimizable and modular. This article will help you through the installation process of Apache 2.2 on Debian 7 and Apache 2.4 on Fedora 20. The default layout and command usage in those distributions are slightly different. In the first place I will show some general configuration options, then I’ll continue with the distribution specific installation process. Note that some dissimilarities come from the different distributions, but some of them are simply because version version differences. You can check the main differences between Apache 2.2 and 2.4 [here](https://httpd.apache.org/docs/2.4/upgrading.html).

### About domains and hostfiles

First of all, if you want to launch a website, you will need a registered domain name. With a registered domain, the DNS servers will connect a specific URL to an IP address defined by you. It works like an ID, without a Domain Name System, only those could look up your website by its name (URL), who mapped it manually in his hostfile. It would be chaotic, wouldn’t it? Unfortunately, for your own domain, you have to pay a registration fee for a certified domain name registrar. However there is one case, where you don’t have to own a registered domain, exactly when you only want to build a local network without going “live”.

For a local network or testing before DNS registering, you have to edit the hosts file in your system. The hosts file in Linux distributions can be found on the following path: **/etc/hosts**. It’s purpose is to map an IP address to a specified domain. You can map any IP adress to any domain, it will only affect your local internet accessing behavior (e.g. mapping 0.0.0.0 to an URL will block that site from your machine). An original hosts file will look something like this:

``` bash
 127.0.0.1 localhost
 127.0.1.1 <host_name>
   
 # The following lines are desirable for IPv6 capable hosts
 ::1   localhost ip6-localhost ip6-loopback
 ff02::1 ip6-allnodes
 ff02::2 ip6-allrouters
```

The format of a redirection looks like the following: [IP address] [host.domain] [alias1] [alias2…]. Let’s see an example. My hostname is “mapserver” and my domain name is “webmappingtutorial.com”. I use my local IP (127.0.0.1) for testing purposes and I want to redirect the URL “www.webmappingtutorial.com” to my server, so “webmappingtutorial” will be an alias. My hosts file will look like this:

``` bash
 debian@mapserver:~$ cat /etc/hosts
 127.0.0.1     mapserver.webmappingtutorial.com www.webmappingtutorial.com mapserver
 127.0.1.1     mapserver mapserver
   
 # The following lines are desirable for IPv6 capable hosts
 ::1   localhost ip6-localhost ip6-loopback
 ff02::1 ip6-allnodes
 ff02::2 ip6-allrouters
```

As you can see there is only one part of the second row, I didn’t speak about. There is my hostname as a second alias, because the system needs the hostname of the system as an alias to generate your fully qualified domain name (FQDN). You can check if your FQDN has been generated properly with the `hostname -f` command:

``` bash
 debian@mapserver:~$ hostname -f
 mapserver.webmappingtutorial.com
```

Of course, with the Domain Name System controlling the URL mappings, these are only local configurations. If you want to go “live” without testing, you won’t have to modify your localhost files, Apache will configure itself with the proper ServerName variable. Therefore when you build a local webserver without a registered domain name, it can be only accessed via its IP address.

A list of advertising servers and their mapping to localhost can be found here.

### Apache installation on Debian

For Debian, there are two options to install Apache 2. The first is, using the integrated task-specific installation program, `tasksel`. With it, you can install Apache with some basic mods by choosing the web-server option in the GUI. The other option (more preferable to me) is using `apt-get` in root:

``` javascript
 debian@mapserver:~$ su
 Password:
 root@mapserver:~# apt-get install apache2
```

Every Apache server comes with a Multi-Processing Module (MPM) with a purpose to handle the request from the clients. The two main MPMs in Apache are Prefork and Worker. Basically, Apache came with Prefork for a long time, but in the newest versions of Debian Wheezy it comes with Worker (at least when you `apt-get` it). You can check yours with one of the following commands:

``` bash
 root@mapserver:~# apache2 -l
 Compiled in modules:
  core.c
  mod_log_config.c
  mod_logio.c
  mod_version.c
  prefork.c
  http_core.c
  mod_so.c
   
 root@mapserver:~# apachectl -V | grep -i mpm
 Server MPM:   Prefork
  -D APACHE_MPM_DIR="server/mpm/prefork"
```

If you want to change the current MPM, you don’t have to compile a custom Apache from source code, just install your preferable one from one of the package managers, like `aptitude` or Synaptic. It will take effect when you restart the server with the command `service apache2 restart`. Note that in a Debian system there can be only one MPM installed at a time and `apache2` commands can only be used by root. I’ll write more about MPMs in a future article.

There are three important directories which are Apache related. The first is the **/var/www**. This directory will contain almost every element of your website (except cgi files) by default. You can change it, but it is recommended to leave it that way. The second one is the **/etc/apache2** directory. This is where you find the configuration files of the server. The default configurations are quite good for a start. These files have the same content on Debian and Fedora, so I’ll write about configuration in the end of this article. The only significant difference is that in Debian the execution of cgi files are enabled by default. The third important directory is the **/var/log/apache2**. It contains the error and access logs of your server and can be crucial in resolving problems.

### Apache installation on Fedora

On Fedora Apache installation will be quite similar to Debian. There will be only one significant difference: the service is called `httpd`. So every command works as fine as on Debian, just replace `apache2` with `httpd` in them. First of all, you have to install the Apache 2 suit with the `yum` command:

``` bash
 [fedora@mapserver ~]$ su
 Password:
 [root@mapserver ~]# yum install httpd
```

Now you just have to initialize the server with the following commands:

``` bash
[root@mapserver ~]# chkconfig httpd on
 Note: Forwarding request to 'systemctl enable httpd.service'.
 ln -s '/usr/lib/systemd/system/httpd.service' '/etc/systemd/system/multi-user.target.wants/httpd.service'
 [root@mapserver ~]# service httpd start
 Redirecting to /bin/systemctl start httpd.service
```

On Fedora 20, the default MPM is Prefork. However, you can’t change MPMs just by installing packages from the Fedora repository. There is a configuration file where you can change between Prefork and Worker. That file is **/etc/httpd/conf.modules.d/00-mpm.conf**. If you open it with a text editor, like `nano` or `vi`, you can uncomment the desired MPM and comment out the previously used.

More detailed information about commenting out and uncommenting code samples can be found [here](https://www.howtogeek.com/118389/how-to-comment-out-and-uncomment-lines-in-a-configuration-file/).

The three main folders is similar to the Debian’s Apache hierarchy. The web content takes place in the **/var/www** directory and the log files can be accessed via **/var/log/httpd**. The configuration files can be found in **/etc/httpd**.

### Apache configuration

The main configuration file of the Apache webserver can be found in **/etc/apache2/apache2.conf** (Debian) or **/etc/httpd/httpd.conf** (Fedora). It contains the main setup parameters with short commented description. You can edit them directly, but if you want to add more parameters, it is recommended to declare them in a new configuration file and include it in the main configuration file. Every configuration file have to end with a **.conf** extension. For example if you create a **myconfig.conf** file in the same directory as your main configuration file, you should add the following line at the end of the main configuration file:

``` bash
 Include myconfig.conf
```

Of course, you can include any custom configuration files with the `Include` parameter with relative path from your main configuration file or an absolute path. There are other parameters like log formats or `IfModule` sections (I will write about them in a later article).

The last step is creating a virtual host for your webserver. Virtual hosts declare the port on your server will listen. The default port is 80 for HTTP requests, but you can create a virtual host listening on port 21 if you want an FTP server for example. In Fedora, this step is very simple, you just have to edit the corresponding section in your main configuration file. However in Debian there are separate files for virtual hosts. They can be found in **/etc/apache2/sites-available** and by default there are only two available files, named **default** and **default-ssl**. You will only need **default** for a dedicated webserver. In a default virtual host file or section you will see something like this:

``` bash
 <VirtualHost *:80>
     ServerAdmin raandal73@gmail.com
     ServerName www.webmappingtutorial.com
   
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
   
     ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
 [...]
     ErrorLog ${APACHE_LOG_DIR}/error.log
     CustomLog ${APACHE_LOG_DIR}/access.log combined
 </VirtualHost>
```

Every parameter with multiple properties in this file starts with `<parameter option(s)>`, and closes with `</parameter>`. Everything within the opening and closing statement belongs to the given parameter. Be very careful to close down everything properly, otherwise it can mess up your webserver. Let’s see the parameters in details.

The VirtualHost contains every parameter concerning to the server. It starts with the port your server will be listening to. The ServerAdmin stands for the e-mail address of the administrator, given to clients to report occasional errors. The ServerName stands for the registered domain name of the server. The DocumentRoot is a symlink, it contains the absolute path of the server’s root folder. The ErrorLog and CustomLog parameters contains the absolute path to the server’s log files (`${APACHE_LOG_DIR`} stands for the default Apache log path variable, in this case: **/var/log/apache2**). With Alias, you can symlink any directories to your website (e.c. if you want **/home/some_stuff** to be accessible from your website you have to include the following parameter and it will be accessible through www.yourdomain/some_stuff):

``` bash
  Alias /some_stuff /home/some_stuff
```

With `ScriptAlias`, you can do the same, but the webserver will assume that you have executable cgi files in the symlinked folder. The Directory parameter will decide the web server’s behavior to the system directories. For example, if you don’t declare the root directory inaccessible, then anybody can break into your server. The default layout is good for starting the server, I will write more about it though in the Apache optimization article. When you finished setting up your configuration files, in Fedora you just have to reload your server with the command `service httpd reload`. In Debian, because the modularity of the virtual hosts, you have to enable the one, you just edited with the `a2ensite virtual_host_name` command and then reload. Let’s assume you just edited the default file.

``` bash
 root@mapserver:~# a2ensite default
 Enabling site default.
 To activate the new configuration, you need to run:
  service apache2 reload
 root@mapserver:~# service apache2 reload
 [ ok ] Reloading web server config: apache2.
```

You can disable any unwanted virtual hosts with `a2dissite virtual_host_name`. Congratulations, you have a secure webserver up and running.

