import { Advertisement, User } from '../../shared/types';

const markdown1 = `# Patrios meae

## Purpureae et oculos foribus neu

Lorem markdownum Menoeten tetigit. Inque nate nec seu corpus antiquis solus,
auram luctus, nemus pariterque ait, foliisque parte? Et oscula animo? Pastores
viros quos: tu parantis aulam rebus cornua: inque ira rursus habeo veste [et
dabo](#nisi-facta) tertius ferax cernentem. Coronae formam gelidoque et posuisse
per benignior qua tamen sua.

- Adversaque illa
- Plus ora ait pudore Dictaeaque parato
- Si stetit coepit
- Tendit sine

Veneni quamquam utrimque frequento cupiere; alto alte memores est per vaccam
vincis aliqua tamen circumspicit temerarius ungues inter tuli. Subitam generat
habitabat quae quanta tenuit!

## Saturnius fit cinxit pacalibus pictas nostrae genuum

Gremio virga cum. Veri nam occasus Scylla sparsi est, et enim nec, sed. Legit
consolantia vultum mutua dedit quoque caenumque rogata restabat?

    parallel += externalHandle / transfer;
    packet = faq_page_dongle;
    var drop_url_xp = yobibyte_leaf + exif.mapBox(pim, 20, card) -
            memoryMonitor;

Speciem errant. Confusaque nulla. Sed posita rarior paulatimque locus. Spartana
quid, facies nec; animos obruta, **in tum officio** qualia amplexaque virginis.

Et *qui* utimur iam si pars feliciter, tendebat loquentis inhospita nunc.
Gorgonei ante conferat amanti, summo quorum nudare colli levare Icare decent.`;

const markdown = `# Eurytidos simplex

## Maeandri Messenia

Lorem **markdownum** adversae diros, sunt. Minimum sui caelum placuerunt, et
causa illi erudit herbae coepit habitat ad. Currus sanguine poteram imitetur,
pondere aeraque inscribit Venulus, est nostra, Sperchios et
[corvum](http://www.misitubi.net/sucis-enim) in. [Novis successibus
Ammon](http://necmonstri.net/curam.php) umbra traxit felix tumidarum fortiter
pennarum intravit ille frater omnia, clamore iniuria?

Non tanto nititur temperie *raucaque potes* fera recepto, ut pectore. Ut te mihi
corpore.

## Nam mihi ita in exstinctus tacito summas

Cepit ubi Olympus, facilesque ore. Tum illo est, rege sine patriumque posses
praebetis pugnat aula sed Fortuna illud; [inpia
sic](http://www.iacentem-istis.io/reddit-o.html) in? *Fide siccaeque signumque*
discedite, quam paterer et adulter prima, *aethere latus* leti per Daedalion
longo fuisset vix. Notavi luxuriant me orat sociis tellus, nunc inquit carmine
in manebo *telisque rogat* oscula.

Bibendo et carpit unica dubiaque, vis depresso populo non, ex. Caeso hinnitus ad
isto raptu delata agat numen aetatis nec. Quis mala non sinus habet donec,
oculos nec, capillos me pluvio. Neci qui marmoreo, te **quid**, iam cladi
inclusum ardesceret Atlantis concrescere absens **amplexus** recusem, quos
lumine arces.

## Ultor ficto fronte exit tauro harundinis tutus

Miram laniger attulit coloribus satis mearumin, cetera caeso antris cruciabere
facerent gloria Titan. Flores iactari; et levavit freta nec vinces amabam, Iulo
viris, renoventur obortae! Electarumque curae hoc, nec non nostraque ceu illa
*Ophias*, visaque. Solaque Peliaeque ut **cladem**, ne sternit siqua, cum iungi
pariterque Iovis, dira olor, videbitur. Capientur dolorem extulit eram formatus;
inpete dentes nant deique fuerunt magna terram ni nocendo repono pavidam paterna
eripitur.

    bareProgramming(ddr(chip.threading(spoofingVista), 4), permalinkEbook(-1,
            fi_flash_thyristor(skyscraper), 4 + left_overwrite));
    if (abend > xpTitle) {
        memory_nas_backbone = googleBlog;
        soString.pci_it *= 4;
        ethernet(troll);
    } else {
        driveTrashAccess -= file_interface_rpc / 4;
        application(ultra_ip_control, zip_folder_cd);
        cdfs_click_raw = memory;
    }
    ict_processor_qbe.boolean = myspace;
    var keyMotionDefault = gifWikiFddi + 4 + favoritesWordUdp(
            stickSkyscraperFile);
    server_pipeline_ad = 82;

Genu animorum illa madidas: latus plangoremque ponit saepe, si Stygiam serior
meos unam, orsa. Carpit retinens, tremulaeque [valle
ictus](http://ait-cibo.io/), caput ora agam. Versasse nostris quam. Non et erit
nec volentem novus ad conatoque ipse [et](http://proles.org/): Enipeus imperio
decoris latarumque trepidos.

De tanta saevo causa nemorum aequaverit superamur modo cernis contineat ait bis,
**aut hinc**. Qui dotatissima nempe redderet cuius Stygias Boreas; potius
succincta annos, ante potuit, Saeculaque divamque. Tibi victoria Aeoliis colla
telluris quamquam et longa, in.`;

const description = `
  ### Taxi service for the people
  Welcome and take a ride in **my** car!
`;

export const MockedCreator: User = {
  name: 'Kalle Kula',
  citizenId: 'y121asdk',
};

export const MockedAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: 'Taxi service',
    description: description,
    body: markdown,
    creator: MockedCreator,
    image:
      'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phoneNumber: '072-12312',
    isCallable: true,
    isPosition: false,
  },
  {
    id: 2,
    title: 'Other services',
    description: `This is a short description displaying this *feature*. It's using **markdown** as well.`,
    body: markdown1,
    creator: MockedCreator,
    phoneNumber: '072-12312',
    isCallable: true,
    isPosition: false,
  },
  {
    id: 3,
    title: 'Car repairs AB',
    description: `Come get repairs, expensive af.`,
    body: markdown1,
    creator: MockedCreator,
    phoneNumber: '072-12312',
    isCallable: true,
    isPosition: false,
  },
];
