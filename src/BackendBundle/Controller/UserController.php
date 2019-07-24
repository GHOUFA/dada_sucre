<?php

namespace BackendBundle\Controller;

use BackendBundle\Entity\User;
use BackendBundle\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;


/**
 * Class UserController
 *
 * @package Tritux\SecurityBundle\Controller
 */
class UserController extends Controller
{
    const MIN_SIZE_PASSWORD = 5;
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $units = $em->getRepository('BackendBundle:User')->findAll();

        return $this->render('BackendBundle:User:list.html.twig', array(
                'units'=>$units,
                'units_contracting'=>null,
                'units_sales'=>null,
                'units_transport'=>null,
                'units_accounting'=>null,
                'MIN_SIZE'=>self::MIN_SIZE_PASSWORD,
        ));
    }

    /**
     * Creates a new unite entity.
     */
    public function newAction(Request $request, $type)
    {
        $notif_service = $this->get('Backend_Notif');
        $em = $this->getDoctrine()->getManager();
        $userManager = $this->container->get('fos_user.user_manager');
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $is_valid = true;
                $user_by_username = $em->getRepository('BackendBundle:User')->findOneBy(
                    array('username' => $user->getUsername())
                );

                $user_by_email = $em->getRepository('BackendBundle:User')->findOneBy(
                    array('email' => $user->getEmail())
                );
                if($user_by_username){
                    $form->get('username')->addError(new FormError('Le login existe'));
                    $is_valid = false;
                }
                if($user_by_email){
                    $form->get('email')->addError(new FormError('L\'email existe'));
                    $is_valid = false;
                }
                if($is_valid){
                    $user->addRole(User::roleByType($type));
                    $user->setPassword($this->container->get('security.password_encoder')->encodePassword($user, $user->getPassword()));
                    $userManager->updateUser($user);
                    $em->persist($user);
                    $em->flush();

                    $notif_service->successNotification();

                    return $this->redirectToRoute('security_user_list', array(), 301);
                } else
                    $notif_service->addErrorNotification('Données invalides');
            }
            else{
                $notif_service->errorDataNotification();
            }
        }

        return $this->render('@Backend/User/new.html.twig', array(
            'form' => $form->createView(),
            'type' => $type
        ));

    }

    public function editAction(Request $request, User $user)
    {
        $notif_service = $this->get('Backend_Notif');

        if(!$user)
            $notif_service->addErrorNotification('Données invalides');
        else{
                $em = $this->getDoctrine()->getManager();
                $form = $this->createForm(UserType::class, $user);

                $form->remove('password');
                $form->handleRequest($request);

                if ($form->isSubmitted()) {
                    if ($form->isValid()) {
                        $is_valid = true;
                        $users_by_username = $em->getRepository('BackendBundle:User')->findBy(
                            array('username' => $user->getUsername())
                        );

                        $users_by_email = $em->getRepository('BackendBundle:User')->findBy(
                            array('email' => $user->getEmail())
                        );

                        if(count($users_by_username) > 1){
                            $form->get('username')->addError(new FormError('Le login existe'));
                            $is_valid = false;
                        } elseif(count($users_by_username) == 1){
                            if($users_by_username[0]->getId() != $user->getId()){
                                $form->get('username')->addError(new FormError('Le login existe'));
                                $is_valid = false;
                            }
                        }

                        if( count($users_by_email) > 1){
                            $form->get('email')->addError(new FormError('L\'email existe'));
                            $is_valid = false;
                        } elseif( count($users_by_email) == 1){
                            if($users_by_email[0]->getId() != $user->getId()){
                                $form->get('username')->addError(new FormError('L\'email existe'));
                                $is_valid = false;
                            }
                        }

                        if($is_valid){
                            $user->setModifiedAt(new \DateTime());
                            $em->flush();

                            $notif_service->successNotification();

                            return $this->redirectToRoute('security_user_list', array(), 301);

                        } else
                            $notif_service->addErrorNotification('Données invalides');
                    }
                    else{
                        $notif_service->errorDataNotification();
                    }
                }

            return $this->render('@Backend/User/edit.html.twig', array(
                'form' => $form->createView(),
                'unit' => $user
            ));
        }
    }

    /**
     * @param User $user
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(User $user){
        $notif_service = $this->get('agence_default.notif');

        if(!$user)
            $notif_service->addErrorNotification('Données invalides');
        else{
            if(Unite::isUnitType($user->getType()))
                return $this->render('@AgenceAgence/Default/show.html.twig', array('unit' => $user));
            else {
                $notif_service->errorDataNotification();
                return $this->redirectToRoute('agence_agence_homepage', array(), 301);
            }
        }
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function updatePasswordAction(Request $request){
        $notif_service = $this->get('agence_default.notif');
        $em = $this->getDoctrine()->getManager();

        if($request->isMethod('POST')){
            $id = $request->request->get('iduser');
            $password = $request->request->get('password');
            $passwordR = $request->request->get('passwordR');
            $user = $em->getRepository('AgenceUserBundle:User')->find($id);

            if(strlen($password) < self::MIN_SIZE_PASSWORD ){
                $notif_service->addErrorNotification('Données invalides');
            } else{
                if(strcmp($password, $passwordR) !== 0 )
                    $notif_service->addErrorNotification('Les deux mots de passe ne sont pas identiques');
                else{
                    if(!$user)
                        $notif_service->addErrorNotification('Compte inexistant');
                    else{
                        if(Unite::isUnitType($user->getType())){
                            $user->setPassword($this->get('security.password_encoder')->encodePassword($user, $password));

                            $em->persist($user);
                            $em->flush();

                            $notif_service->successNotification();
                        }
                        else $notif_service->addErrorNotification('Compte inexistant');
                    }
                }
            }
            return $this->redirectToRoute('agence_agence_homepage', array(), 301);
        }
        else  throw $this->createNotFoundException('Entité invalide');
    }
}