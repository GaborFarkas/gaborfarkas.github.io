import { CodeViewerComponent } from '@/components/code-viewer/code-viewer.component';
import { Component } from '@angular/core';

/**
 * Linux as a programming language case study
 */
@Component({
    selector: 'linux-as-programming-language',
    templateUrl: './linux-as-programming-language.component.html',
    imports: [CodeViewerComponent]
})
export class LinuxAsProgrammingLanguageComponent {
    /**
     * Upsol logger module content.
     */
    protected loggerFile = `
#!/bin/bash

# Solar service logger
# Created by University of Pécs, 2018.

# Log levels follow rsyslog levels.
# 0 - Emergency: system is unusable
# 1 - Alert: action must be taken immediately
# 2 - Critical: critical conditions
# 3 - Error: error conditions
# 4 - Warning: warning conditions
# 5 - Notice: normal but significant condition
# 6 - Informational: informational messages
# 7 - Debug: debug-level messages

#TODO: handle multiline messages

source ./time.sh

# Do not start without the required environmental variables set.
if [[ -z $LOGFILE || -z $ERRLOGFILE || -z $LOGLEVEL ]]; then
    echo "Logger module should be started by the daemon only"
    exit 1
fi

# Parse named arguments. Note that DEBUG can be inherited from the daemon.
while [ $# -gt 0 ]; do
    case $1 in
        -d=*|--debug=*)
            DEBUG="\${1#*=}"
        ;;
        -d|--debug)
            DEBUG=true
        ;;
        -q|--query)
            QUERYMODE=true
        ;;
        -m=*|--message=*)
            MESSAGE="\${1#*=}"
        ;;
        -l=*|--level=*)
            LEVEL="\${1#*=}"
        ;;
        -f=*|--facility=*)
            FACILITY="\${1#*=}"
        ;;
        -df=*|--date-from=*)
            DATEFROM="\${1#*=}"
        ;;
        -dt=*|--date-to=*)
            DATETO="\${1#*=}"
        ;;
        *)
            echo "Invalid argument \${1%=*}"
            exit 1
        ;;
    esac
    shift
done

# If any essential info is missing, log that instead as a logger error.
# If we are in query mode, we don't care.
if [ ! "$QUERYMODE" ] && [[ -z $LEVEL ]]; then
    NEWMESSAGE="No level was provided"
    [ "$DEBUG" ] && echo $NEWMESSAGE || $0 -m="$NEWMESSAGE" -l=3 -f="logger"
    ERROR=true
# NOTE: Don't change the ! [ $LEVEL -eq $LEVEL ], it's a volatile form of type checking.
elif ! [ $LEVEL -eq $LEVEL ] 2>/dev/null; then
    NEWMESSAGE="Level must be an integer value"
    [ "$DEBUG" ] && echo $NEWMESSAGE || $0 -m="$NEWMESSAGE" -l=3 -f="logger"
    ERROR=true
elif [[ $LEVEL -lt 0 || $LEVEL -gt 7 ]]; then
    NEWMESSAGE="Level must be between 0 and 7"
    [ "$DEBUG" ] && echo $NEWMESSAGE || $0 -m="$NEWMESSAGE" -l=3 -f="logger"
    ERROR=true
else
    # Choose the appropriate log file based on log level.
    if [ "$LEVEL" ] && [[ "$LEVEL" -gt 3 ]]; then
        DEST=$LOGFILE
    elif [ "$LEVEL" ] && [[ "$LEVEL" -le 3 ]]; then
        DEST=$ERRLOGFILE
    fi
fi

if [ ! "$QUERYMODE" ] && [[ -z $MESSAGE ]]; then
    NEWMESSAGE="No log message was provided"
    [ "$DEBUG" ] && echo $NEWMESSAGE || $0 -m="$NEWMESSAGE" -l=3 -f="logger"
    ERROR=true
fi

if [ ! "$QUERYMODE" ] && [[ -z $FACILITY ]]; then
    NEWMESSAGE="No facility was provided"
    [ "$DEBUG" ] && echo $NEWMESSAGE || $0 -m="$NEWMESSAGE" -l=3 -f="logger"
    ERROR=true
fi

if [ "$ERROR" ]; then
    exit 1
fi

if [ "$QUERYMODE" ]; then
    # Query the log file(s) for the provided parameters. Note that this cannot query rotated logs.
    if [ "$DEST" ]; then
        RESULT=$(cat "$DEST")
    else
        RESULT=$(cat "$LOGFILE" "$ERRLOGFILE")
    fi

    # Awk out every relevant line based on facility and level
    if [ "$FACILITY" ]; then
        RESULT=$(echo "$RESULT" | awk -v facility="[$FACILITY]" '$2 == facility')
    fi
    if [ "$LEVEL" ]; then
        RESULT=$(echo "$RESULT" | awk -v level="[$LEVEL]" '$3 == level')
    fi

    # Check if we have intervals, smart-fill invalid or missing values
    if [ "$DATEFROM" ] || [ "$DATETO" ]; then
        if [ "$DATEFROM" ]; then
            if ! [ $DATEFROM -eq $DATEFROM ] 2>/dev/null; then
                DATEFROM=$(time_timestamp_to_epoch "$DATEFROM" 2>/dev/null)
                if [ ! "$DATEFROM" ]; then
                    DATEFROM=0
                fi
            fi
        else
            DATEFROM=0
        fi

        if [ "$DATETO" ]; then
            if ! [ $DATETO -eq $DATETO ] 2>/dev/null; then
                DATETO=$(time_timestamp_to_epoch "$DATETO" 2>/dev/null)
                if [ ! "$DATETO" ]; then
                    DATETO=$(time_utc_time)
                    DATETO=$(time_timestamp_to_epoch "$DATETO")
                fi
            fi
        else
            DATETO=$(time_utc_time)
            DATETO=$(time_timestamp_to_epoch "$DATETO")
        fi

        # Filter out every relevant line based on time
        # We need a function as piped whiles are run in subshells making variables hard to recover from
        iterateResults() {
            echo "$1" | while read line; do
                TIMESTAMP=$(echo "$line" | cut -f1 -d"]" | cut -f2 -d"[")
                TIMESTAMP=$(time_timestamp_to_epoch "$TIMESTAMP")
                if [ $TIMESTAMP -ge $DATEFROM ] && [ $TIMESTAMP -le $DATETO ]; then
                    echo "$line"
                fi
            done
        }
        RESULT=$(iterateResults "$RESULT")
    fi

    echo "$RESULT"
else
    if [ "$LEVEL" -le "$LOGLEVEL" ]; then
        # Print the collected data to the appropriate log file. Date is in ISO-8601 format.
        echo "[$(time_utc_time)] [$FACILITY] [$LEVEL] $MESSAGE" >> $DEST
    fi
fi

exit 0`;

    /**
     * Upsol daemon excerpt. Business logic removed.
     */
    protected daemonFile = `
#!/bin/bash

# Solar service daemon.
# Created by University of Pécs, 2018.

#TODO: log every fucking step. Use the debug log level where applicable.
#REWRITE: make it modular, make it testable, get rid of this imperative spaghetti nonsense.

# Set some global variables.
export LOGGER=./bin/logger
export IO=./bin/io
export ANALYSIS=./bin/analysis
export PASSWDMAN=./passwd/passwdman
export DEBUG=
export WORKDIR=
export RECEIPTDIR=
# Scheduler related, to keep track of analyzed parks from the collected analysis.
export PARKLIST=""

# Set some local variables.
QUACK=""
CONFIG=
CONFDIR=
LIBDIR=
DAEMON=
TTY=$(tty)

# Parse named arguments. Note that quack is an internal argument for running this process as
# a daemon. Do not use explicitly! tty is a debug argument, neither use that.
while [ $# -gt 0 ]; do
    case $1 in
        -d=*|--debug=*)
            DEBUG="\${1#*=}"
        ;;
        -d|--debug)
            DEBUG=true
        ;;
        --quack=*)
            QUACK="\${1#*=}"
        ;;
        --tty=*)
            TTY="\${1#*=}"
        ;;
        *)
            echo "Invalid argument \${1%=*}"
            exit 1
        ;;
    esac
    shift
done

# Apply necessary measures for this program to act like a daemon.
# See http://www.faqs.org/faqs/unix-faq/programmer/faq/ Section 1.7 for further reading.

cd $LIBDIR
if [ "$QUACK" = "fork" ]; then
    [ "$DEBUG" ] && echo "Child session, need to fork"
    umask 0
    $DAEMON --debug=$DEBUG --tty=$TTY --quack="daemon" </dev/null >/dev/null 2>/dev/null &
    exit 0
fi
if [ "$QUACK" != "daemon" ]; then
    [ "$DEBUG" ] && echo "Parent session, need to spawn child"
    setsid $DAEMON --debug=$DEBUG --tty=$TTY --quack="fork" &
    exit 0
fi

# Define configuration loader functions after the process is daemonized.
load_config() {
    # [...] Business logic removed for brevity
}

reload_config() {
    # [...] Business logic removed for brevity
}

# Dump config if we are in debug mode.
dump_config() {
    # [...] Business logic removed for brevity
}

# Fills a dump file with the config and schedule dumps.
create_dumpfile() {
    dump_config > $WORKDIR/dumpfile
}

# Kill all children on shutdown.
shutdown_daemon() {
    trap - SIGINT SIGTERM
    kill -- -$$
}

# Load configuration files.
source ./scheduler.sh
source ./time.sh
source ./config.sh
source ./filesys.sh
load_config
[ "$DEBUG" ] && echo "Configuration files loaded successfully" >>$TTY || $LOGGER -m="Configuration files loaded successfully" -l=6 -f="kernel"

# Trap the USR1 signal, which is used for reloading configuration without shutting down the daemon.
trap reload_config SIGUSR1

# Trap USR2 signal, which is used for dumping scheduler status while running.
trap create_dumpfile SIGUSR2

# Trap kill signals so the daemon can kill its running subprocesses, if any.
trap shutdown_daemon SIGINT SIGTERM

if [ "$DEBUG" ]; then
    echo "Successfully detached, running as a daemon" >>$TTY
    sleep 5
    dump_config >>$TTY
    exit 0
else
    # [...] Business logic removed for brevity
fi

exit 0`;

    protected schedulerLibFile = `
# scheduler.sh
#
# Scheduling helper library for the solar service.
# Created by University of Pécs, 2018.
#
###
# This library is somewhat irregular, as it was designed to be used only by the daemon.
# Thus, it assumes some variables, like $WORKDIR, or the array(s) it operates on.
# These variables do not have to be exported, if the lib is used by the daemon.
# Scheduled items have the following fixed format: task|module|park|time|retries|status
#
# task: input, parse, output, analysis, send
# module: one of the valid modules for the given task (e.g. omsz for io)
# park: the park id, if applicable
# time: epoch time of scheduled operation (e.g. start or force-stop)
# retries: number of retries for this task
# status: scheduled, running, waiting
#
# Additionally, every item has an ID, which is generated on the fly, and not saved.
# There are several associative arrays: one for the items, one for the running operations
# with their elapsed time, two for the dependency tree. Yes, it's a tree. Yes, in Bash. No, I'm not crazy.
# The key is the ID in both of the cases. There is also a regular array containing scheduled
# item IDs in chronological order.
###

# Dumps arrays from the current schedule for debugging purposes.
# @returns Writes array content to stdout.
scheduler_dump_schedule() {
    local OLDIFS="$IFS"
    IFS=$'\n'
    local TAB=$'\t'

    # Dump item list
    echo "Item list:"
    local i
    for i in "\${!__SCHEDULEITEMS[@]}"; do
        local TIME=$(echo "\${__SCHEDULEITEMS[$i]}" | cut -f4 -d"|")
        local TIMESTAMP=$(time_epoch_to_timestamp "$TIME")
        echo "$TAB""$i \${__SCHEDULEITEMS[$i]}"" ($TIMESTAMP)"
    done

    # Dump dependency lists
    echo "Dependency list:"
    echo "$TAB""Parents:"
    for i in "\${!__SCHEDULEDEPPARENTS[@]}"; do
        echo "$TAB""$TAB""$i \${__SCHEDULEDEPPARENTS[$i]}"
    done
    echo "$TAB""Children:"
    for i in "\${!__SCHEDULEDEPCHILDREN[@]}"; do
        echo "$TAB""$TAB""$i \${__SCHEDULEDEPCHILDREN[$i]}"
    done

    # Dump scheduled processes
    echo "Schedule:"
    for i in "\${__SCHEDULE[@]}"; do
        echo "$TAB""$i"
    done

    IFS="$OLDIFS"
}`;

    /**
     * Upsol BATS test file for logger.
     */
    protected loggerBatsFile = `
#!/usr/bin/env bats

source test/bats_common.sh

LOGGER=bin/logger

setup() {
    cd testbuild/lib
    export LOGFILE=../log/testlog.log
    export ERRLOGFILE=../log/testerror.log
    export LOGLEVEL=7
    touch ../log/testlog.log
    touch ../log/testerror.log
}

teardown() {
    rm ../log/testlog.log
    rm ../log/testerror.log
    cd $WD
}

@test "$FILENAME - Shell can use our method for integer type checking" {
    INT=6
    REAL=6.2

    [ $INT -eq $INT ]
    ! [ $REAL -eq $REAL ]
}

@test "$FILENAME - Exits if log files are not set" {
    unset LOGFILE
    unset ERRLOGFILE
    run $LOGGER -d
    [ "$output" = "Logger module should be started by the daemon only" ]
    [ "$status" -eq 1 ]
}

@test "$FILENAME - Exits on unsupported argument with error" {
    run $LOGGER -d --unsupported=argument
    [ "$status" -eq 1 ]
    [ "$output" = "Invalid argument --unsupported" ]
}

@test "$FILENAME - Exits if a mandatory argument is missing" {
    run $LOGGER -d -f="testing" -l=1
    [ "$output" = "No log message was provided" ]
    [ "$status" -eq 1 ]

    run $LOGGER -d -m="Houston, we have a problem!" -l=1
    [ "$output" = "No facility was provided" ]
    [ "$status" -eq 1 ]

    run $LOGGER -d -m="Houston, we have a problem!" -f="testing"
    [ "$output" = "No level was provided" ]
    [ "$status" -eq 1 ]
}

@test "$FILENAME - In production, logs if a mandatory argument is missing" {
    run $LOGGER -f="testing" -l=1
    [ "$(count_lines $ERRLOGFILE)" -eq 1 ]
    [ "$status" -eq 1 ]

    run $LOGGER -m="Houston, we have a problem!" -l=1
    [ "$(count_lines $ERRLOGFILE)" -eq 2 ]
    [ "$status" -eq 1 ]

    run $LOGGER -m="Houston, we have a problem!" -f="testing"
    [ "$(count_lines $ERRLOGFILE)" -eq 3 ]
    [ "$status" -eq 1 ]
}

@test "$FILENAME - Exits if level is not a valid integer between 0 and 7" {
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=-1
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=8
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=6.52
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=6,52
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=true
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Houston, we have a problem!" -f="testing" -l=false
    [ "$status" -eq 1 ]
    run $LOGGER -d -m="Everything is okay!" -f="testing" -l=0
    [ "$status" -eq 0 ]
    run $LOGGER -d -m="Everything is okay!" -f="testing" -l=7
    [ "$status" -eq 0 ]
    run $LOGGER -d -m="Everything is okay!" -f="testing" -l=5
    [ "$status" -eq 0 ]
}

@test "$FILENAME - Logs to info log if level is greater than 3" {
    run $LOGGER -m="Everything is okay!" -f="testing" -l=4
    [ "$(count_lines $LOGFILE)" -eq 1 ]
    run $LOGGER -m="Everything is okay!" -f="testing" -l=5
    [ "$(count_lines $LOGFILE)" -eq 2 ]
    run $LOGGER -m="Everything is okay!" -f="testing" -l=6
    [ "$(count_lines $LOGFILE)" -eq 3 ]
    run $LOGGER -m="Everything is okay!" -f="testing" -l=7
    [ "$(count_lines $LOGFILE)" -eq 4 ]
}

@test "$FILENAME - Logs to error log if level is less than 4" {
    run $LOGGER -m="Houston, we have a problem!" -f="testing" -l=0
    [ "$(count_lines $ERRLOGFILE)" -eq 1 ]
    run $LOGGER -m="Houston, we have a problem!" -f="testing" -l=1
    [ "$(count_lines $ERRLOGFILE)" -eq 2 ]
    run $LOGGER -m="Houston, we have a problem!" -f="testing" -l=2
    [ "$(count_lines $ERRLOGFILE)" -eq 3 ]
    run $LOGGER -m="Houston, we have a problem!" -f="testing" -l=3
    [ "$(count_lines $ERRLOGFILE)" -eq 4 ]
}

@test "$FILENAME - Logs with a valid timestamp" {
    run $LOGGER -m="Everything is okay!" -f="testing" -l=4
    TIMESTAMP=$(cat $LOGFILE | cut -f1 -d"]" | cut -f2 -d"[")
    date -d $TIMESTAMP
}

@test "$FILENAME - Logs facility, level, and message" {
    run $LOGGER -m="Everything is okay!" -f="testing" -l=4
    OUTPUT=$(grep "Everything is okay!" $LOGFILE)
    [ -n "$OUTPUT" ]
    OUTPUT=$(grep "testing" $LOGFILE)
    [ -n "$OUTPUT" ]
    OUTPUT=$(grep "4" $LOGFILE)
    [ -n "$OUTPUT" ]
}

@test "$FILENAME - Can query log files without adding parameters" {
    $LOGGER -m="Everything is okay!" -f="testing1" -l=4
    $LOGGER -m="Everything is okay!" -f="testing2" -l=5

    run $LOGGER -q
    [ $(echo "$output" | count_lines) -eq 2 ]
}

@test "$FILENAME - Can query log files based on level" {
    $LOGGER -m="Everything is okay!" -f="testing1" -l=4
    $LOGGER -m="Everything is okay!" -f="testing2" -l=5

    run $LOGGER -q -l=5
    [ $(echo "$output" | count_lines) -eq 1 ]
    OUTPUT=$(grep "testing2" $LOGFILE)
    [ -n "$OUTPUT" ]
    OUTPUT=$(grep "5" $LOGFILE)
    [ -n "$OUTPUT" ]
}

@test "$FILENAME - Cannot query with an invalid level format" {
    $LOGGER -m="Everything is okay!" -f="testing1" -l=4
    $LOGGER -m="Everything is okay!" -f="testing2" -l=5

    run $LOGGER -q -l=6.2
    [ $status -eq 1 ]

    run $LOGGER -q -l=10
    [ $status -eq 1 ]
}

@test "$FILENAME - Can query log files based on facility" {
    $LOGGER -m="Everything is okay!" -f="testing1" -l=4
    $LOGGER -m="Everything is okay!" -f="testing2" -l=5

    run $LOGGER -q -f=testing1
    [ $(echo "$output" | count_lines) -eq 1 ]
    OUTPUT=$(grep "testing1" $LOGFILE)
    [ -n "$OUTPUT" ]
    OUTPUT=$(grep "4" $LOGFILE)
    [ -n "$OUTPUT" ]
}

@test "$FILENAME - Can query log files based on multiple criteria" {
    $LOGGER -m="Everything is okay!" -f="testing1" -l=4
    $LOGGER -m="Everything is okay!" -f="testing2" -l=5
    $LOGGER -m="Everything is okay!" -f="testing1" -l=6

    run $LOGGER -q -f=testing1 -l=4
    [ $(echo "$output" | count_lines) -eq 1 ]
    OUTPUT=$(grep "testing1" $LOGFILE)
    [ -n "$OUTPUT" ]
    OUTPUT=$(grep "4" $LOGFILE)
    [ -n "$OUTPUT" ]
}

@test "$FILENAME - Can query log files based on time (epoch or timestamp)" {
    echo "[2018-01-01T00:00:00+0000] [testing1] [4] Everything is okay!" > ../log/testlog.log
    echo "[2018-02-01T00:00:00+0000] [testing2] [5] Everything is okay!" >> ../log/testlog.log
    echo "[2018-03-01T00:00:00+0000] [testing3] [6] Everything is okay!" >> ../log/testlog.log

    run $LOGGER -q -df=1515000000
    echo "$output"
    [ $(echo "$output" | count_lines) -eq 2 ]
    OUTPUT=$(echo "$output" | grep "testing2")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "5")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "testing3")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "6")
    [ -n "$OUTPUT" ]

    run $LOGGER -q -df="2018-01-02T00:00:00+0000"
    [ $(echo "$output" | count_lines) -eq 2 ]
    OUTPUT=$(echo "$output" | grep "testing2")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "5")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "testing3")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "6")
    [ -n "$OUTPUT" ]

    run $LOGGER -q -dt=1518000000
    [ $(echo "$output" | count_lines) -eq 2 ]
    OUTPUT=$(echo "$output" | grep "testing2")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "5")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "testing1")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "4")
    [ -n "$OUTPUT" ]

    run $LOGGER -q -dt="2018-02-02T00:00:00+0000"
    [ $(echo "$output" | count_lines) -eq 2 ]
    OUTPUT=$(echo "$output" | grep "testing2")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "5")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "testing1")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "4")
    [ -n "$OUTPUT" ]

    run $LOGGER -q -df="2018-01-02T00:00:00+0000" -dt="2018-02-02T00:00:00+0000"
    [ $(echo "$output" | count_lines) -eq 1 ]
    OUTPUT=$(echo "$output" | grep "testing2")
    [ -n "$OUTPUT" ]
    OUTPUT=$(echo "$output" | grep "5")
    [ -n "$OUTPUT" ]
}

@test "$FILENAME - On invalid times do unbounded queries" {
    echo "[2018-01-01T00:00:00+0000] [testing1] [4] Everything is okay!" > ../log/testlog.log
    echo "[2018-02-01T00:00:00+0000] [testing2] [5] Everything is okay!" >> ../log/testlog.log
    echo "[2018-03-01T00:00:00+0000] [testing3] [6] Everything is okay!" >> ../log/testlog.log

    run $LOGGER -q -df="Two thousand and eighteen on the second of January"
    echo "$output"
    [ $(echo "$output" | count_lines) -eq 3 ]

    run $LOGGER -q -dt="Two thousand and eighteen on the second of January"
    [ $(echo "$output" | count_lines) -eq 3 ]

    run $LOGGER -q -df="Two thousand and eighteen on the second of January" -dt="Two thousand and eighteen on the third of January"
    [ $(echo "$output" | count_lines) -eq 3 ]
}`;

    /**
     * Makefile content without any sensitive data.
     */
    protected makeFile = `
# Makefile for building, installing, and testing solar service.
# Created by Gábor Farkas, 2018.

# Since this is a makefile, when modified, make sure to use tabs, not whitespaces.
# Also, makefiles are run in /bin/sh, so no bashisms!

# Set some global build variables
buildDir = build
pidFile = /var/run/solard.pid
daemonPath = /usr/sbin/solard
libDir = /usr/lib/solar
configPath = /etc/solar
logPath = /var/log/solar
errorLogPath = /var/log/solar
archivePath =
workDir = /tmp/solar
receiptDir =
serverName =
pathPrefix =

# Make build the default target.
.PHONY : all
all : build

.PHONY : build
build : build-dirs build-kernel build-analysis build-logger build-io build-lib build-utils build-passwd
	@echo "Building finished"

# [...] Build targets for system components removed for brevity.

.PHONY : build-test
build-test : settestvars build
	@mkdir testbuild/log; \\
	mkdir testbuild/archive; \\
	mkdir testbuild/work; \\
	mkdir testbuild/receipts; \\
	chmod a+x testbuild/lib/passwd/passwdman;

.PHONY : settestvars
settestvars :
	$(eval buildDir = testbuild)
	$(eval pidFile = testbuild/solard.pid)
	$(eval daemonPath = ../bin/solard)
	$(eval libDir = ./)
	$(eval configPath = ../config)
	$(eval logPath = ../log)
	$(eval errorLogPath = ../log)
	$(eval archivePath = ../archive)
	$(eval confExtension = testconf)
	$(eval workDir = ../work)
	$(eval receiptDir = ../receipts)
	$(eval serverName = testserver)

.PHONY : install
# Copy files to their correct destination, if they are built.
install : install-files install-frommake install-service
	@echo "Installation complete. Please run \\"solarctl config\\" before first start."

# [...] Installation targets removed for brevity.

.PHONY : install-deps
#Install required dependencies.
install-deps :
	@if [ "$$(id -u)" -eq 0 ]; then \\
		if [ -e /etc/os-release ]; then \\
			ID=$$(grep ^ID /etc/os-release | cut -f2 -d"="); \\
			DIST=$$(echo "$$ID" | tr "[:upper:]" "[:lower:]"); \\
			case $$DIST in \\
				debian|ubuntu) \\
					apt-get install -y $$(cat deps/debian); \\
					apt-get install -y $$(cat deps/debian-dev); \\
					pip3 install $$(cat deps/python-pip); \\
				;; \\
				*) \\
					echo "Auto-installing dependencies is not supported on this distribution."; \\
				;; \\
			esac \\
		else \\
			echo "Auto-installing dependencies is not supported on this distribution/release."; \\
		fi \\
	else \\
		echo "Target install-deps must be run as root."; \\
	fi

.PHONY : build-deb
build-deb : prepare-packaging clean build release-new install-files build-deb-package
	@echo "Building successful."

.PHONY : prepare-packaging
prepare-packaging :
	$(eval pathPrefix = package/temp)
	@mkdir package/temp; \\
	git stash

.PHONY : release-new
release-new :
	@CURRVER=$$(git tag -l --points-at HEAD); \\
	if [ -z "$$CURRVER" ]; then \\
		LASTVER=$$(grep ^Version: package/deb/control | cut -f2 -d":" | tr -d " "); \\
		printf "Version number of current release (last one was $$LASTVER): "; \\
		read CURRVER; \\
		if [ $$CURRVER ]; then \\
			sed -i "s|Version:.*|Version: $$CURRVER|" package/deb/control; \\
			git add package/deb/control; \\
			git commit -m "Release version $$CURRVER"; \\
			git tag "$$CURRVER" HEAD; \\
		else \\
			echo "A version number must be provided for every new release."; \\
			rm -r package/temp; \\
			exit 1; \\
		fi \\
	fi

.PHONY : build-deb-package
build-deb-package :
	@CURRVER=$$(git tag -l --points-at HEAD); \\
	mkdir package/temp/DEBIAN; \\
	cp package/deb/* package/temp/DEBIAN/; \\
	chmod a+x package/temp/DEBIAN/postinst; \\
	chmod a+x package/temp/DEBIAN/preinst; \\
	chmod a+x package/temp/DEBIAN/prerm; \\
	fakeroot dpkg -b package/temp ./upsol-$$CURRVER.deb; \\
	rm -r package/temp; \\
	git stash pop; \\
	printf "Do you want to deploy the new version? [y/n]: "; \\
	read DEPLOY; \\
	case $$DEPLOY in \\
		i|igen|y|yes) \\
			printf "Specify the SSH port of the servers: "; \\
			read SSHPORT; \\
			scp -P $$SSHPORT upsol-$$CURRVER.deb [Redacted]; \\
			scp -P $$SSHPORT upsol-$$CURRVER.deb [Redacted]; \\
		;; \\
	esac

.PHONY : test
# Test libs from source, everything else from the test build.
test : settestvars
	@echo "Running Bash tests"; \\
	export DAEMON=$(daemonPath); \\
	for i in test/*; do \\
		if [ -d "$$i" ]; then \\
			case "$$(basename $$i)" in \\
				kernel|logger|io|io-modules) \\
					if [ -d testbuild ]; then \\
						echo "Running $$(basename $$i) tests:"; \\
						bats $$i; \\
					else \\
						echo "Test build cannot be found. Skipping $$(basename $$i) tests."; \\
					fi \\
				;; \\
				testdata) \\
					true \\
				;; \\
				*) \\
					echo "Running $$(basename $$i) tests:"; \\
					bats $$i; \\
				;; \\
			esac \\
		fi \\
	done

.PHONY : clean
clean :
	@echo "Cleaning up"; \\
	rm -r build && \\
	echo "Cleaning up complete"

.PHONY : mrproper
mrproper :
	@echo "There's no clean like Mr. Clean"; \\
	if [ -d build ]; then \\
		rm -r build; \\
	fi; \\
	if [ -d testbuild ]; then \\
		rm -r testbuild; \\
	fi

.PHONY : stat
# A fun target for getting insight into the project.
stat :
	@echo "LOC statistics:"; \\
	cloc --read-lang-def=.testlang --force-lang="Bourne Again Shell,sh" $$(git ls-files); \\
	echo "Commits per developer:"; \\
	git shortlog -s -n; \\
	echo "Contribution per developer:"; \\
	git log --format='%aN' | sort -u | while read name; do \\
		STAT=$$(git log -M -C --author="$$name" --pretty=tformat: --numstat | awk '{ add += $$1; subs += $$2; loc += $$1 - $$2 } END { printf "    %s insertions(+), %s deletions(-), %s total\\n", add, subs, loc }' -); \\
		echo "$$STAT  $$name\\n"; \\
		getDateArr() { \\
			CURRDATE="$$(date -d "1970-01-01")"; \\
			CURRCONT=0; \\
			git log -M -C --author="$$name" --numstat --date=short --pretty=tformat:%cd | while read i; do \\
				if [ -n "$$(date -d "$$i" 2>/dev/null)" ] && [ -n "$$i" ]; then \\
					if [ $$CURRCONT -gt 0 ] && [ "$$(date -d "$$CURRDATE" +%s)" -ne "$$(date -d "$$i" +%s)" ]; then \\
						echo "$$CURRDATE,$$CURRCONT"; \\
						CURRCONT=0; \\
					fi; \\
					CURRDATE="$$i"; \\
				else \\
					FILECONT=$$(echo "$$i" | awk '{ total = $$1 - $$2 } END { printf "%s", total }' -); \\
					CURRCONT=$$((CURRCONT+FILECONT)); \\
				fi; \\
			done; \\
		}; \\
		DATEARR="$$(getDateArr | sort)"; \\
		MAX=$$(echo "$$DATEARR" | awk -F"," 'BEGIN{ max = 0 } { max = $$2 > max ? $$2 : max } END { printf "%s", max }' -); \\
		FIRSTDATE=$$(echo "$$DATEARR" | head -n1 | cut -f1 -d,); \\
		LASTDATE=$$(echo "$$DATEARR" | tail -n1 | cut -f1 -d,); \\
		HALFWAY="$$((($$(date -d $$LASTDATE +%s) - $$(date -d $$FIRSTDATE +%s)) / (60 * 60 * 24) / 2))"; \\
		MIDDATE=$$(date -d "$$FIRSTDATE+$$HALFWAY days" +%Y-%m-%d); \\
		GRAPH=$$(echo "$$DATEARR" | gnuplot -p -e "set terminal dumb 65 10; set datafile separator \\",\\"; set key off; set xdata time; set timefmt \\"%Y-%m-%d\\"; \\
			set format x \\"%Y-%m-%d\\"; set xrange [\\"$$FIRSTDATE\\":\\"$$LASTDATE\\"]; set xtics (\\"$$FIRSTDATE\\", \\"$$MIDDATE\\", \\"$$LASTDATE\\"); \\
			plot \\"<cat\\" using 1:2 smooth unique" | sed -e "s/^/   /" | tail -n +2); \\
		echo "$$GRAPH" | grep --color=always "*"; \\
		echo "$$GRAPH" | tail -n2; \\
	done`;
}
