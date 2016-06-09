<?php
$command = "cd /var/www/status-site && git reset --hard HEAD && git pull origin master && gulp build";

// TODO check against ip or secret hash

if ( $_SERVER['HTTP_X_GITHUB_EVENT'] == 'push' ) {

    if( ($fp = popen($command, "r")) ) {
        while( !feof($fp) ){
            echo fread($fp, 1024);
            flush();
        }
        fclose($fp);
    }
}