<?php
ignore_user_abort(true);
set_time_limit(0);
$command = "cd /var/www/status-site && git reset --hard HEAD && git pull origin master && gulp build";

// TODO check against ip or secret hash
$log_file = "/var/www/status-site/build.log";
file_put_contents($log_file, var_export($_SERVER, true), FILE_APPEND);
$content = file_get_contents("php://input");
file_put_contents($log_file, var_export($content, true), FILE_APPEND);
if ( $_SERVER['HTTP_X_GITHUB_EVENT'] == 'push' ) {

    if( ($fp = popen($command, "r")) ) {
        while( !feof($fp) ){
            $result = fread($fp, 1024);
            file_put_contents($log_file, $result, FILE_APPEND);
            echo $result;
            flush();
        }
        fclose($fp);
    }
}
