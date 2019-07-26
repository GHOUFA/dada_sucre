<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Devis;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Devi controller.
 *
 */
class DevisController extends Controller
{
    /**
     * Lists all devi entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $devis = $em->getRepository('AppBundle:Devis')->findAll();

        return $this->render('devis/index.html.twig', array(
            'devis' => $devis,
        ));
    }
    /**
     * remerciment.
     *
     */
    public function finishAction()
    {
        return $this->render('devis/finish.html.twig', array(
        ));
    }

    /**
     * Creates a new devi entity.
     *
     */
    public function newAction(Request $request)
    {
        $devi = new Devis();
        $form = $this->createForm('AppBundle\Form\DevisType', $devi);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($devi);
            $em->flush();

            return $this->redirectToRoute('devis_encharge');
        }

        return $this->render('devis/new.html.twig', array(
            'devi' => $devi,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a devi entity.
     *
     */
    public function showAction(Devis $devi)
    {
        $deleteForm = $this->createDeleteForm($devi);

        return $this->render('devis/show.html.twig', array(
            'devi' => $devi,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing devi entity.
     *
     */
    public function editAction(Request $request, Devis $devi)
    {
        $deleteForm = $this->createDeleteForm($devi);
        $editForm = $this->createForm('AppBundle\Form\DevisType', $devi);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('devis_edit', array('id' => $devi->getId()));
        }

        return $this->render('devis/edit.html.twig', array(
            'devi' => $devi,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a devi entity.
     *
     */
    public function deleteAction(Request $request, Devis $devi)
    {
        $form = $this->createDeleteForm($devi);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($devi);
            $em->flush();
        }

        return $this->redirectToRoute('devis_index');
    }

    /**
     * Creates a form to delete a devi entity.
     *
     * @param Devis $devi The devi entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Devis $devi)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('devis_delete', array('id' => $devi->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
