<?php

namespace AppBundle\Form;

use AppBundle\Entity\Devis;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DevisType extends AbstractType
{
    protected $compression = [
        "A" => '0',
        "B" => '1',
        "C" => '2',
        "D" => '3',
    ];
    protected $choice = [
          "A" => '0',
          "B" => '1',
    ];

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $defaultModechoice = [
            Devis::STANDART  => 0,
            Devis::Perso      => 1
        ];
        $builder
            ->add('name')
            ->add('compane')
            ->add('localite')
            ->add('typeProduct', ChoiceType::class, array(
                'choices'  => $defaultModechoice,
                'expanded' => true,
                'required' => true,
            ))
            ->add('quality', ChoiceType::class, array(
                'choices'  => $this->compression,
                'choices_as_values' => true,
            ));
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Devis'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_devis';
    }


}
