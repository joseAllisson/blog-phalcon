<?php

namespace MyApp\Models;

use Phalcon\Mvc\Model;
use Phalcon\Messages\Message;
use Phalcon\Validation;
use Phalcon\Validation\Validator\PresenceOf;

class Posts extends Model
{
    public function validation()
    {
        $validator = new Validation();

        $validator->add(
            'name',
            new PresenceOf(
                [
                    'message' => 'The name is required',
                ]
            )
        );

        $validator->add(
            'title',
            new PresenceOf(
                [
                    'message' => 'The title is required',
                ]
            )
        );

        $validator->add(
            'description',
            new PresenceOf(
                [
                    'message' => 'The description is required',
                ]
            )
        );

        // Validate the validator
        return $this->validate($validator);
    }
}