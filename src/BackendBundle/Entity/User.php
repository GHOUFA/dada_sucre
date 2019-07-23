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
}