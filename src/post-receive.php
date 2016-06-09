<?php
$command = "cd /var/www/status-site && git reset --hard HEAD && git pull && gulp build";

// TODO check

if ( $_SERVER['HTTP_X_GITHUB_EVENT'] == 'push' ) {

    if( ($fp = popen($command, "r")) ) {
        while( !feof($fp) ){
            echo fread($fp, 1024);
            flush();
        }
        fclose($fp);
    }
}