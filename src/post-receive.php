<?php
$command = "cd /var/www/status-site && git reset --hard HEAD && git pull origin master && gulp build";

// TODO check against ip or secret hash

if ( $_SERVER['HTTP_X_GITHUB_EVENT'] == 'push' ) {

    if( ($fp = popen($command, "r")) ) {
        while( !feof($fp) ){
            $result = fread($fp, 1024);
            file_put_contents("build.log", $result, FILE_APPEND);
            echo $result;
            flush();
        }
        fclose($fp);
    }
}