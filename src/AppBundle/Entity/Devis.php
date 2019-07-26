<?php

namespace AppBundle\Entity;

/**
 * Devis
 */
class Devis
{
    const STANDART = "Standard(logo DADA)";
    const Perso    = "Personalisé(votre logo)";
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $compane;

    /**
     * @var string
     */
    private $localite;

    /**
     * @var boolean
     */
    private $typeProduct;



    /**
     * @var int
     */
    private $quality;

    /**
     * @var boolean
     */
    private $type;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Devis
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set compane
     *
     * @param string $compane
     *
     * @return Devis
     */
    public function setCompane($compane)
    {
        $this->compane = $compane;

        return $this;
    }

    /**
     * Get compane
     *
     * @return string
     */
    public function getCompane()
    {
        return $this->compane;
    }

    /**
     * Set localite
     *
     * @param string $localite
     *
     * @return Devis
     */
    public function setLocalite($localite)
    {
        $this->localite = $localite;

        return $this;
    }

    /**
     * Get localite
     *
     * @return string
     */
    public function getLocalite()
    {
        return $this->localite;
    }

    /**
     * Set typeProduct
     *
     * @param boolean $typeProduct
     *
     * @return Devis
     */
    public function setTypeProduct($typeProduct)
    {
        $this->typeProduct = $typeProduct;

        return $this;
    }

    /**
     * Get typeProduct
     *
     * @return boolean
     */
    public function getTypeProduct()
    {
        return $this->typeProduct;
    }

    /**
     * Set quality
     *
     * @param integer $quality
     *
     * @return Devis
     */
    public function setQuality($quality)
    {
        $this->quality = $quality;

        return $this;
    }

    /**
     * Get quality
     *
     * @return int
     */
    public function getQuality()
    {
        return $this->quality;
    }
}
