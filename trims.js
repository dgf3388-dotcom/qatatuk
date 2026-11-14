// فئات (Trims) السيارات. الأساس حسب الشركة، مع استثناءات لموديلات محددة معروفة.
// الصيغة: اسم واحد، أو "الاسم العربي|الاسم الإنجليزي". لإضافة فئة أضفها إلى قائمة الشركة أو الموديل.
(function(){
const S="ستاندرد|Standard";
const brands={
"تويوتا":[S,"GL","GLX","GLE","SE","Limited","VX","VXR","GXR","TRD","Sport","Hybrid|Hybrid"],
"هيونداي":["GL","GLS","Smart","Comfort","Premium","Luxury","Limited","N Line"],
"كيا":["LX","EX","SX","GT Line","GT","Premium","Luxury","Highline"],
"نيسان":["S","SV","SL","SR","XE","SE","LE","Platinum","Titanium","Nismo"],
"فورد":["Base","SE","SEL","XLT","Titanium","Limited","Platinum","Sport","ST","GT","Lariat","Raptor"],
"شيفروليه":["LS","LT","LTZ","RS","SS","Premier","Z71","High Country","Midnight"],
"جي إم سي":["SLE","SLT","AT4","Denali","Denali Ultimate"],
"دودج":["SE","SXT","GT","R/T","Scat Pack","SRT","Hellcat","Limited"],
"جيب":["Sport","Latitude","Laredo","Limited","Overland","Summit","Sahara","Rubicon","Trailhawk"],
"لكزس":[S,"Premier","Luxury","F Sport","Executive","Platinum","Ultra Luxury"],
"هوندا":["DX","LX","EX","EX-L","Sport","Touring","Elegance"],
"مازدا":[S,"Touring","Grand Touring","Signature","Sport","Premium","GT"],
"ميتسوبيشي":["GLX","GLS","Mid","Highline","Sport","GT","Exceed"],
"سوزوكي":["GA","GL","GLX","Premium","Sport"],
"إيسوزو":["LS","LX","V-Cross",S],
"مرسيدس":[S,"Avantgarde","Exclusive","AMG Line","AMG","Night Edition","Maybach"],
"بي إم دبليو":[S,"Luxury Line","Sport Line","M Sport","M Performance","Individual"],
"أودي":[S,"Advanced","Design","S line","Sport","Premium","Prestige","RS"],
"فولكسفاجن":["Trendline","Comfortline","Highline","R-Line","GTI","R","SE","SEL"],
"لاند روفر":["S","SE","HSE","Dynamic","R-Dynamic","Autobiography","Vogue","SV","First Edition"],
"بورشه":[S,"S","GTS","4S","Turbo","Turbo S","GT3"],
"جيلي":[S,"Comfort","Premium","Luxury","Flagship","Sport"],
"شانجان":[S,"Comfort","Elite","Luxury","Premium","Sport","Flagship"],
"هافال":[S,"Comfort","Premium","Luxury","Elite","Flagship"],
"إم جي":[S,"Comfort","Luxury","Trophy","Exclusive","Excite"],
"كاديلاك":["Luxury","Premium Luxury","Sport","Platinum","V-Series"],
"إنفينيتي":["Pure","Luxe","Sensory","Essential","Autograph","Red Sport"]
};
const models={
"تويوتا|لاند كروزر":["GX","GXR","VX","VXR","VXS"],
"تويوتا|برادو":["TX","TXL","VX"],
"نيسان|باترول":["XE","SE","LE","Platinum","Nismo"]
};
const norm=a=>a.map(s=>{const i=s.indexOf('|');return i<0?[s,s]:[s.slice(0,i),s.slice(i+1)]});
const B={},M={};Object.keys(brands).forEach(k=>B[k]=norm(brands[k]));Object.keys(models).forEach(k=>M[k]=norm(models[k]));
window.QT_TRIMS={brands:B,models:M};
})();
