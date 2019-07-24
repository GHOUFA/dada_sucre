<?php
// src/AppBundle/Entity/User.php

namespace BackendBundle\Entity;

use BackendBundle\Utilities\TimestampableTrait;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    const ROLE_USER = "ROLE_USER";
    const Type_USER = "user";
    const ROLE_ADMIN = "ROLE_ADMIN";
    const Type_ADMIN = "admin";
    use TimestampableTrait;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();

        $this->setEnabled(true);
        $this->createdAt = new \DateTime();
        $this->modifiedAt = new \DateTime();
    }
    /**
     * @return string
     */
    public function typeUser(){
        return User::Type_USER;
    }
    
    /**
     * @return string
     */
    public function typeAdmin(){
        return User::Type_USER;
    }
    static function roleByType($type){
        $role = "";
        switch($type){
            case User::Type_USER:
                $role = User::ROLE_USER;
                break;
            case User::Type_ADMIN:
                $role = User::ROLE_ADMIN;
                break;
        }
        return $role;
    }
}