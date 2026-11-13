// موديلات كل شركة مصنعة (الاسم العربي|الاسم الإنجليزي). الأكثر انتشاراً في السوق السعودي أولاً.
// لإضافة موديل: أضف سطراً داخل قائمة الشركة المناسبة بنفس الصيغة. مفتاح الشركة يطابق اسمها العربي في قائمة الشركات.
(function(){
const D={
"تويوتا":"كامري|Camry,كورولا|Corolla,يارس|Yaris,لاند كروزر|Land Cruiser,برادو|Prado,فورتشنر|Fortuner,هايلكس|Hilux,رافور|RAV4,أفالون|Avalon,كراون|Crown,كورولا كروس|Corolla Cross,راش|Rush,إنوفا|Innova,فيلوز|Veloz,هايس|Hiace,كوستر|Coaster,سيكويا|Sequoia,تاكوما|Tacoma,تندرا|Tundra,C-HR|C-HR,بريوس|Prius,سوبرا|Supra,GR86|GR86,إف جي كروزر|FJ Cruiser,بريفيا|Previa,أيغو|Aygo,أفانزا|Avanza",
"هيونداي":"النترا|Elantra,سوناتا|Sonata,أكسنت|Accent,توسان|Tucson,سنتافي|Santa Fe,باليسيد|Palisade,كريتا|Creta,كونا|Kona,فينيو|Venue,أزيرا|Azera,جراند i10|Grand i10,i10|i10,i20|i20,i30|i30,فيلوستر|Veloster,ستاريا|Staria,H1|H1,إيونيك|Ioniq,ماكسكروز|Maxcruz,تيراكان|Terracan,جنسس كوبيه|Genesis Coupe,جالوبر|Galloper,إكسل|Excel",
"كيا":"سيراتو|Cerato,أوبتيما|Optima,K5|K5,ريو|Rio,بيجاس|Pegas,بيكانتو|Picanto,سبورتاج|Sportage,سورنتو|Sorento,سيلتوس|Seltos,سونيت|Sonet,تيلورايد|Telluride,كارنيفال|Carnival,ستينجر|Stinger,كادينزا|Cadenza,موهافي|Mohave,كارينز|Carens,نيرو|Niro,EV6|EV6,سول|Soul,سيفيا|Sephia,سبكترا|Spectra",
"نيسان":"ألتيما|Altima,صني|Sunny,باترول|Patrol,سنترا|Sentra,ماكسيما|Maxima,إكس تريل|X-Trail,قاشقاي|Qashqai,كيكس|Kicks,باثفايندر|Pathfinder,نافارا|Navara,أرمادا|Armada,جوك|Juke,مورانو|Murano,تيدا|Tiida,إكستيرا|Xterra,أورفان|Urvan,ماجنايت|Magnite,370Z|370Z,GT-R|GT-R,ميكرا|Micra,باترول بيك أب|Patrol Pickup,سيدريك|Cedric,ليف|Leaf,روج|Rogue,ترانو|Terrano",
"فورد":"إكسبلورر|Explorer,توروس|Taurus,فيوجن|Fusion,موستنج|Mustang,إيدج|Edge,إسكيب|Escape,إكسبيديشن|Expedition,F-150|F-150,رينجر|Ranger,فوكس|Focus,فيستا|Fiesta,إيكو سبورت|EcoSport,برونكو|Bronco,كراون فيكتوريا|Crown Victoria,ترانزيت|Transit,تيريتوري|Territory,فلكس|Flex,F-250|F-250,كوجا|Kuga,مونديو|Mondeo",
"شيفروليه":"تاهو|Tahoe,سوبربان|Suburban,سيلفرادو|Silverado,ماليبو|Malibu,كابريس|Caprice,كروز|Cruze,أوبترا|Optra,أفيو|Aveo,تريل بليزر|Trailblazer,بليزر|Blazer,إكوينوكس|Equinox,تراكس|Trax,كمارو|Camaro,كورفيت|Corvette,ترافيرس|Traverse,إمبالا|Impala,كابتيفا|Captiva,أورلاندو|Orlando,سبارك|Spark,لومينا|Lumina,إكسبريس|Express,كولورادو|Colorado,بولت|Bolt",
"جي إم سي":"يوكن|Yukon,يوكن إكس إل|Yukon XL,سييرا|Sierra,أكاديا|Acadia,تيرين|Terrain,سافانا|Savana,إنفوي|Envoy,سوبربان|Suburban,جيمي|Jimmy,كانيون|Canyon,هامر إي في|Hummer EV",
"دودج":"تشارجر|Charger,تشالنجر|Challenger,دورانجو|Durango,جورني|Journey,كارافان|Caravan,نيترو|Nitro,دارت|Dart,ماجنوم|Magnum,فايبر|Viper,أفينجر|Avenger,رام 1500|Ram 1500,كاليبر|Caliber",
"جيب":"رانجلر|Wrangler,جراند شيروكي|Grand Cherokee,شيروكي|Cherokee,كومباس|Compass,رينيجيد|Renegade,جلادييتر|Gladiator,ليبرتي|Liberty,باتريوت|Patriot,جراند واجونير|Grand Wagoneer,واجونير|Wagoneer",
"لكزس":"ES|ES,LS|LS,IS|IS,GS|GS,RC|RC,LC|LC,NX|NX,RX|RX,GX|GX,LX|LX,UX|UX,CT|CT,RZ|RZ,LFA|LFA",
"هوندا":"أكورد|Accord,سيفيك|Civic,سيتي|City,CR-V|CR-V,HR-V|HR-V,بايلوت|Pilot,جاز|Jazz,أوديسي|Odyssey,ريدجلاين|Ridgeline,إنسايت|Insight,S2000|S2000,بريليود|Prelude,إنتيجرا|Integra,باسبورت|Passport,بريوم|Brio,إليفيت|Elevate,شاتل|Shuttle",
"مازدا":"مازدا 3|Mazda3,مازدا 6|Mazda6,مازدا 2|Mazda2,CX-3|CX-3,CX-30|CX-30,CX-5|CX-5,CX-9|CX-9,CX-7|CX-7,CX-8|CX-8,CX-60|CX-60,MX-5|MX-5,BT-50|BT-50,تريبيوت|Tribute,مازدا 323|Mazda 323,مازدا 626|Mazda 626,RX-8|RX-8",
"ميتسوبيشي":"لانسر|Lancer,أتراج|Attrage,ASX|ASX,أوتلاندر|Outlander,باجيرو|Pajero,باجيرو سبورت|Pajero Sport,إكسباندر|Xpander,L200|L200,ميراج|Mirage,إيكليبس كروس|Eclipse Cross,جالانت|Galant,مونتيرو|Montero,ترايتون|Triton,كولت|Colt,كانتر|Canter,جراندس|Grandis",
"سوزوكي":"سويفت|Swift,ديزاير|Dzire,بالينو|Baleno,سياز|Ciaz,إرتيجا|Ertiga,فيتارا|Vitara,جراند فيتارا|Grand Vitara,جيمني|Jimny,إس كروس|S-Cross,ألتو|Alto,سيليريو|Celerio,ليانا|Liana,XL7|XL7,فرونكس|Fronx,كيزاشي|Kizashi,إس بريسو|S-Presso,كاري|Carry,سايدكيك|Sidekick",
"إيسوزو":"دي ماكس|D-Max,MU-X|MU-X,تروبر|Trooper,NPR|NPR,NQR|NQR,FTR|FTR",
"مرسيدس":"الفئة C|C-Class,الفئة E|E-Class,الفئة S|S-Class,الفئة A|A-Class,الفئة B|B-Class,CLA|CLA,CLS|CLS,GLA|GLA,GLB|GLB,GLC|GLC,GLE|GLE,GLS|GLS,G-Class|G-Class,ML|ML,GL|GL,SL|SL,SLK|SLK,AMG GT|AMG GT,V-Class|V-Class,سبرينتر|Sprinter,ميباخ|Maybach,فيانو|Viano",
"بي إم دبليو":"الفئة 3|3 Series,الفئة 5|5 Series,الفئة 7|7 Series,الفئة 1|1 Series,الفئة 2|2 Series,الفئة 4|4 Series,الفئة 6|6 Series,الفئة 8|8 Series,X1|X1,X2|X2,X3|X3,X4|X4,X5|X5,X6|X6,X7|X7,Z4|Z4,M3|M3,M4|M4,M5|M5,i4|i4,iX|iX",
"أودي":"A3|A3,A4|A4,A6|A6,A8|A8,A1|A1,A5|A5,A7|A7,Q2|Q2,Q3|Q3,Q5|Q5,Q7|Q7,Q8|Q8,TT|TT,R8|R8,e-tron|e-tron,RS6|RS6,S3|S3,S4|S4",
"فولكسفاجن":"جولف|Golf,باسات|Passat,جيتا|Jetta,بولو|Polo,تيجوان|Tiguan,طوارق|Touareg,تيرامونت|Teramont,أرتيون|Arteon,بيتل|Beetle,شيروكو|Scirocco,T-Roc|T-Roc,ID.4|ID.4,ترانسبورتر|Transporter,كارافيل|Caravelle,كادي|Caddy,تايجو|Taigo",
"لاند روفر":"رنج روفر|Range Rover,رنج روفر سبورت|Range Rover Sport,إيفوك|Evoque,فيلار|Velar,ديسكفري|Discovery,ديسكفري سبورت|Discovery Sport,ديفندر|Defender,فريلاندر|Freelander,LR3|LR3,LR4|LR4",
"بورشه":"كايين|Cayenne,ماكان|Macan,باناميرا|Panamera,911|911,تايكان|Taycan,باكستر|Boxster,كايمان|Cayman",
"جيلي":"إمجراند|Emgrand,كولراي|Coolray,أزكارا|Azkarra,توجيلا|Tugella,مونجارو|Monjaro,GX3 Pro|GX3 Pro,أوكافانجو|Okavango,GC6|GC6,EC7|EC7,GS|GS,سي كي|CK,باندا|Panda,جيومتري سي|Geometry C",
"شانجان":"CS35 Plus|CS35 Plus,CS75|CS75,CS75 Plus|CS75 Plus,CS85|CS85,CS95|CS95,CS55 Plus|CS55 Plus,إيدو|Eado,ألسفين|Alsvin,UNI-T|UNI-T,UNI-K|UNI-K,UNI-V|UNI-V,هنتر|Hunter,بيني|Benni,رايتون|Raeton,سي إس 15|CS15",
"هافال":"H6|H6,H6 GT|H6 GT,جوليون|Jolion,دارجو|Dargo,H9|H9,H2|H2,H1|H1,H7|H7",
"إم جي":"MG5|MG5,MG6|MG6,MG3|MG3,MG GT|MG GT,ZS|ZS,HS|HS,RX5|RX5,RX8|RX8,T60|T60,MG4|MG4,Marvel R|Marvel R,MG7|MG7,MG One|MG One",
"كاديلاك":"إسكاليد|Escalade,CT4|CT4,CT5|CT5,CT6|CT6,XT4|XT4,XT5|XT5,XT6|XT6,ATS|ATS,CTS|CTS,SRX|SRX,XTS|XTS,DTS|DTS,ليريك|Lyriq",
"إنفينيتي":"Q50|Q50,Q60|Q60,Q70|Q70,QX50|QX50,QX55|QX55,QX60|QX60,QX70|QX70,QX80|QX80,G37|G37,FX35|FX35,EX35|EX35,M37|M37"
};
const M={};Object.keys(D).forEach(k=>{M[k]=D[k].split(',').map(s=>{const i=s.indexOf('|');return [s.slice(0,i),s.slice(i+1)]})});
window.QT_MODELS=M;
})();
