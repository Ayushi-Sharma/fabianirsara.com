<?php

$app->get('/images/{size}[/{file}]', function($request, $response, $args)
{
  return (new App\Images($request, $response, $args))->getAction();
});
