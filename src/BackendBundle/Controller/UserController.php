<?php

namespace BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


/**
 * Class UserController
 *
 * @package Tritux\SecurityBundle\Controller
 */
class UserController extends Controller
{
    const MIN_SIZE_PASSWORD = 5;
//    public function listAction()
//    {
//        return $this->render('BackendBundle:User:list.html.twig', ['groupName' => null]);
//    }
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $units = $em->getRepository('BackendBundle:User')->findAll();

        return $this->render('BackendBundle:User:list.html.twig', array(
                //                'units_agences'=>$units_agences,
                'units'=>$units,
                'units_contracting'=>null,
                'units_sales'=>null,
                'units_transport'=>null,
                'units_accounting'=>null,
                'MIN_SIZE'=>self::MIN_SIZE_PASSWORD,
        ));
    }
}