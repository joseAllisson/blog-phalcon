<?php

use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\Http\Response;
use Phalcon\Di\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql as PdoMysql;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
header("Access-Control-Allow-Headers: *");

$loader = new Loader();

$loader->registerNamespaces(
    [
        'MyApp\Models' => __DIR__ . '/models/',
    ]
);

$loader->register();
$container = new FactoryDefault();

$container->set(
    'db',
    function () {
        return new PdoMysql(
            [
                'host'     => 'localhost',
                'username' => 'root',
                'password' => '',
                'dbname'   => 'blog',
            ]
        );
    }
);

$app = new Micro($container);

// get all
$app->get(
    '/api/posts',
    function () use ($app) {
        $phql = 'SELECT * '
              . 'FROM MyApp\Models\Posts '
              . 'ORDER BY id DESC'
        ;

        $posts = $app
            ->modelsManager
            ->executeQuery($phql)
        ;

        $data = [];

        foreach ($posts as $post) {
            $data[] = [
                'id'   => $post->id,
                'name' => $post->name,
                'title' => $post->title,
                'description' => $post->description,
                'create_at' => $post->create_at,
            ];
        }

        echo json_encode($data);
    }
);

// insert
$app->post(
    '/api/posts',
    function () use ($app) {
        $post = $app->request->getJsonRawBody();
        $phql  = 'INSERT INTO MyApp\Models\Posts '
               . '(name, description, title) '
               . 'VALUES '
               . '(:name:, :description:, :title:)'
        ;

        $status = $app
            ->modelsManager
            ->executeQuery(
                $phql,
                [
                    'name' => $post->name,
                    'title' => $post->title,
                    'description' => $post->description,
                ]
            )
        ;

        $response = new Response();

        if ($status->success() === true) {
            $response->setStatusCode(201, 'Created');

            $post->id = $status->getModel()->id;

            $response->setJsonContent(
                [
                    'status' => 'OK',
                    'data'   => $post,
                ]
            );
        } else {
            $response->setStatusCode(409, 'Conflict');

            $errors = [];
            foreach ($status->getMessages() as $message) {
                $errors[] = $message->getMessage();
            }

            $response->setJsonContent(
                [
                    'status'   => 'ERROR',
                    'messages' => $errors,
                ]
            );
        }

        return $response;
    }
);

// update
$app->put(
    '/api/posts/{id}',
    function ($id) use ($app) {
        $post = $app->request->getJsonRawBody();
        $phql  = 'UPDATE MyApp\Models\Posts '
               . 'SET name = :name:, description = :description:, title = :title: '
               . 'WHERE id = :id:';

        $status = $app
            ->modelsManager
            ->executeQuery(
                $phql,
                [
                    'id'   => $id,
                    'name' => $post->name,
                    'title' => $post->title,
                    'description' => $post->description,
                ]
            )
        ;

        $response = new Response();

        if ($status->success() === true) {
            $response->setJsonContent(
                [
                    'status' => 'OK'
                ]
            );
        } else {
            $response->setStatusCode(409, 'Conflict');

            $errors = [];
            foreach ($status->getMessages() as $message) {
                $errors[] = $message->getMessage();
            }

            $response->setJsonContent(
                [
                    'status'   => 'ERROR',
                    'messages' => $errors,
                ]
            );
        }

        return $response;
    }
);

// Deletes posts based on primary key
$app->delete(
    '/api/posts/{id}',
    function ($id) use ($app) {
        $phql = 'DELETE '
              . 'FROM MyApp\Models\Posts '
              . 'WHERE id = :id:';

        $status = $app
            ->modelsManager
            ->executeQuery(
                $phql,
                [
                    'id' => $id,
                ]
            )
        ;

        $response = new Response();

        if ($status->success() === true) {
            $response->setJsonContent(
                [
                    'status' => 'OK'
                ]
            );
        } else {
            $response->setStatusCode(409, 'Conflict');

            $errors = [];
            foreach ($status->getMessages() as $message) {
                $errors[] = $message->getMessage();
            }

            $response->setJsonContent(
                [
                    'status'   => 'ERROR',
                    'messages' => $errors,
                ]
            );
        }

        return $response;
    }
);

$app->handle(
    $_SERVER["REQUEST_URI"]
);
