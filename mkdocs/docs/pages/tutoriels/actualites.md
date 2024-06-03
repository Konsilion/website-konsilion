---
hide:
  - toc
  - navigation
categories:
  - Evenement
  - Données
  - Documentation
  - Gouvernance
date: 2024-01-31
---

Pour les textes d'actualité il suffit de :

* supprimer les categories non concernées.
* changer la date



# Titre Principal - il n'y en a qu'un seul dans un document

## Titre 2

### Titre 3

Pour rédiger un pararagraphe il suffit d'écrire normalement.

## Mise en forme du texte

Pour mettre en *italic* il faut mettre entre un asterix. Pour mettre en **gras un texte** il faut mettre entre deux asterix.

Ajouter des espaces, ne change rien.

Pour ajouter des espaces en plus il faut faire "<br />" :

Au dessus, il y a trois à la ligne de rejoutés.

Pour ajouter une barre horizontale, il faut faire "<hr>" :

<hr>

### Listes à points

* Afin de rédiger une liste il faut mettre une asterix au départ
* Puis aller à la ligne, sans autres espaces entre les deux lignes.
* Si un espace est mis, c'est pas "si grave" c'est juste que c'est une nouvelle liste qui est créée.

### Listes numérotée

1. Pour faire une liste numérotée, il faut indiquer un chiffre au départ,
2. Automatiquement le logiciel comprendre que s'il y a un chiffre et un point alors c'est une liste numérotée,
3. Il ne **faut pas** sauter de ligne sinon c'est une nouvelle liste.
4. D'ailleurs, tu remarque que peut importe le chiffre qui est mis,
5. Automatiquement le logiciel remet en forme la liste numérotée.

## Image, vidéo et Hyperlien

### Images

Pour insérer une image il faut faire cela :

![description de l'image](https://lien.org)

Voici une méthode où il y a plus de paramètre pour l'image :

![description de l'image](https://lien.org){style = width ...}

### Vidéos

Pour insérer un lien, il faut faire cela :

![type:video](https://www.youtube.com/embed/LXb3EKWsInQ)

### Liens

Pour insérer un lien, il faut faire cela :

[Texte à affcher](https://lien.org)

## Admonitions

Les admonitions sont très utiles afin de stylyser le document. Ils sont aussi appellés encrat ou accordeon.

Voici les deux types, encart ou accordeon :

* encart : !!!
* accordeon : 
  * ???  (accordeon fermé de base)
  * ???+ (accordeon ouvert de base)

Pour la suite, je vais expliquer avec un accordeon fermé de base, mais il suffira de changer les "???" par l'admonition souhaité.

Voici la structure :

??? tip "Titre de l'admonition"

	Commencer par une tabulation et rédiger le texte. L'ensemble du texte doit être tabulé sinon cela ne marchera pas.
	Dans une tabulation il est tout à fait possible d'insérer une image :
	![](https://lien.org)

	Maintenant si je vais à la ligne sans tabulation ça stopera l'admonition.

Voilà.
