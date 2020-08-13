const SunCalc = require("suncalc");
const megalodon = require("megalodon");
const CronJob = require("cron").CronJob;

const generator = megalodon.default;
const BASE_URL = "https://xn--69aa8bzb.xn--y9a3aq";
const accessToken = process.env.ACCESS_TOKEN;
const client = generator("mastodon", BASE_URL, accessToken);
function getMoonPhaseEmoji() {
  const moonPosition = SunCalc.getMoonIllumination(new Date());
  const { phase } = moonPosition;
  const moonPhases = ["🌑", "🌒 ", "🌓 ", "🌔 ", "🌕 ", "🌖 ", "🌗", "🌘 "];

  const { length } = moonPhases;
  const currentPosition = Math.round((length - 1) * phase);
  return moonPhases[currentPosition];
}

const emojis = [
  { emoji: "🐵", name: "կապիկի դեմք" },
  { emoji: "🐒", name: "կապիկ" },
  { emoji: "🦍", name: "գորիլա" },
  { emoji: "🦧", name: "օրանգուտան" },
  { emoji: "🐶", name: "շան մռութ" },
  { emoji: "🐕", name: "շուն" },
  { emoji: "🦮", name: "ուղեկցող շուն" },
  { emoji: "🐕‍🦺", name: "ծառայողական շուն" },
  { emoji: "🐩", name: "պուդել" },
  { emoji: "🐺", name: "գայլ" },
  { emoji: "🦊", name: "աղվես" },
  { emoji: "🦝", name: "ջրարջ" },
  { emoji: "🐱", name: "կատվի մռութ" },
  { emoji: "🐈", name: "կատու" },
  { emoji: "🐈‍⬛", name: "սև կատու" },
  { emoji: "🦁", name: "առյուծի մռութ" },
  { emoji: "🐯", name: "վագրի մռութ" },
  { emoji: "🐅", name: "վագր" },
  { emoji: "🐆", name: "ընձառյուծ" },
  { emoji: "🐴", name: "ձիու մռութ" },
  { emoji: "🐎", name: "ձի" },
  { emoji: "🦄", name: "միաեղջյուր" },
  { emoji: "🦓", name: "զեբր" },
  { emoji: "🦌", name: "եղնիկ" },
  { emoji: "🦬", name: "բիզոն" },
  { emoji: "🐮", name: "կովի մռութ" },
  { emoji: "🐂", name: "ցուլիկ" },
  { emoji: "🐃", name: "ջրագոմեշ" },
  { emoji: "🐄", name: "կով" },
  { emoji: "🐷", name: "խոզի մռութ" },
  { emoji: "🐖", name: "խոզ" },
  { emoji: "🐗", name: "վարազ" },
  { emoji: "🐽", name: "խոզի քիթ" },
  { emoji: "🐏", name: "արու ոչխար" },
  { emoji: "🐑", name: "ոչխար" },
  { emoji: "🐐", name: "այծ" },
  { emoji: "🐪", name: "ուղտ" },
  { emoji: "🐫", name: "երկսապատավոր ուղտ" },
  { emoji: "🦙", name: "լամա" },
  { emoji: "🦒", name: "ընձուղտ" },
  { emoji: "🐘", name: "փիղ" },
  { emoji: "🦣", name: "մամոնտ" },
  { emoji: "🦏", name: "ռնգեղջյուր" },
  { emoji: "🦛", name: "գետաձի" },
  { emoji: "🐭", name: "մկան դեմք" },
  { emoji: "🐁", name: "մուկ" },
  { emoji: "🐀", name: "առնետ" },
  { emoji: "🐹", name: "գերմանամուկ" },
  { emoji: "🐰", name: "ճագարի մռութ" },
  { emoji: "🐇", name: "ճագար" },
  { emoji: "🐿", name: "շերտասկյուռ" },
  { emoji: "🦫", name: "կուղբ" },
  { emoji: "🦔", name: "ոզնի" },
  { emoji: "🦇", name: "չղջիկ" },
  { emoji: "🐻", name: "արջ" },
  { emoji: "🐻‍❄", name: "բևեռային արջ" },
  { emoji: "🐨", name: "կոալա" },
  { emoji: "🐼", name: "պանդա" },
  { emoji: "🦥", name: "համրուկ" },
  { emoji: "🦦", name: "ջրասամույր" },
  { emoji: "🦨", name: "ժանտաքիս" },
  { emoji: "🦘", name: "ագեվազ" },
  { emoji: "🦡", name: "փորսուղ" },
  { emoji: "🐾", name: "թաթերի հետքեր" },
  { emoji: "🦃", name: "հնդկահավ" },
  { emoji: "🐔", name: "հավ" },
  { emoji: "🐓", name: "աքաղաղ" },
  { emoji: "🐣", name: "ձվից դուրս եկող ճուտիկ" },
  { emoji: "🐤", name: "ճուտիկ" },
  { emoji: "🐥", name: "դեմքով շրջված ճուտիկ" },
  { emoji: "🐦", name: "թռչուն" },
  { emoji: "🐧", name: "պինգվին" },
  { emoji: "🕊", name: "աղավնի" },
  { emoji: "🦅", name: "արծիվ" },
  { emoji: "🦆", name: "բադ" },
  { emoji: "🦢", name: "կարապ" },
  { emoji: "🦉", name: "բու" },
  { emoji: "🦤", name: "դոդո" },
  { emoji: "🪶", name: "փետուր" },
  { emoji: "🦩", name: "ֆլամինգո" },
  { emoji: "🦚", name: "սիրամարգ" },
  { emoji: "🦜", name: "թութակ" },
  { emoji: "🐸", name: "գորտ" },
  { emoji: "🐊", name: "կոկորդիլոս" },
  { emoji: "🐢", name: "կրիա" },
  { emoji: "🦎", name: "մողես" },
  { emoji: "🐍", name: "օձ" },
  { emoji: "🐲", name: "վիշապի մռութ" },
  { emoji: "🐉", name: "վիշապ" },
  { emoji: "🦕", name: "զավրոպոդ" },
  { emoji: "🦖", name: "տիրանոզավր ռեքս" },
  { emoji: "🐳", name: "ջուր ցայտեցնող կետաձուկ" },
  { emoji: "🐋", name: "կետ" },
  { emoji: "🐬", name: "դելֆին" },
  { emoji: "🦭", name: "ծովափիղ" },
  { emoji: "🐟", name: "ձուկ" },
  { emoji: "🐠", name: "արևադարձային ձուկ" },
  { emoji: "🐡", name: "փքաձուկ" },
  { emoji: "🦈", name: "շնաձուկ" },
  { emoji: "🐙", name: "ութոտնուկ" },
  { emoji: "🐚", name: "պարուրաձև խխունջախեցի" },
  { emoji: "🐌", name: "խխունջ" },
  { emoji: "🦋", name: "թիթեռ" },
  { emoji: "🐛", name: "միջատ" },
  { emoji: "🐜", name: "մրջյուն" },
  { emoji: "🐝", name: "մեղու" },
  { emoji: "🪲", name: "բզեզ" },
  { emoji: "🐞", name: "զատիկ" },
  { emoji: "🦗", name: "ծղրիդ" },
  { emoji: "🪳", name: "ուտիճ" },
  { emoji: "🕷", name: "սարդ" },
  { emoji: "🕸", name: "սարդոստայն" },
  { emoji: "🦂", name: "շագանակագույն կարիճ" },
  { emoji: "🦟", name: "մոծակ" },
  { emoji: "🪰", name: "ճանճ" },
  { emoji: "🪱", name: "որդ" },
  { emoji: "🦠", name: "մանրէ" },
  { emoji: "🦀", name: "կրաբ" },
  { emoji: "🦞", name: "օմար" },
  { emoji: "🦐", name: "ծովախեցգետին" },
  { emoji: "🦑", name: "կաղամար" },
  { emoji: "🦪", name: "ոստրե" },
  { emoji: "✈", name: "ինքնաթիռ" },
  { emoji: "🛩", name: "փոքր ինքնաթիռ" },
  { emoji: "🛫", name: "օդանավի մեկնում" },
  { emoji: "🛬", name: "օդանավի ժամանում" },
  { emoji: "🪂", name: "անկարգել" },
  { emoji: "💺", name: "նստատեղ" },
  { emoji: "🚁", name: "ուղղաթիռ" },
  { emoji: "🚟", name: "կախովի երկաթուղի" },
  { emoji: "🚠", name: "լեռնային ճոպանուղի" },
  { emoji: "🚡", name: "օդային տրամվայ" },
  { emoji: "🛰", name: "արբանյակ" },
  { emoji: "🚀", name: "հրթիռ" },
  { emoji: "🛸", name: "թռչող ափսե" },
  { emoji: "🧜‍♀️", name: "ջրահարս" },
  { emoji: "🧜", name: "մարդաձուկ" },
];

const { length } = emojis;
const պատահականԷմոջի = () => Math.round(Math.random() * (length - 1));

function getPrediction() {
  const randomEmoji = emojis[պատահականԷմոջի()];

  const գուշակոիթյուն = [
    `Զգոիշացեք, այսօր դուք կարողա տեսնեք ${randomEmoji.name} ${randomEmoji.emoji}․`,
    `Այսօր սպասվում է ուժեղ ${randomEmoji.name} ${randomEmoji.emoji}․`,
    `${randomEmoji.name} ${randomEmoji.emoji} չուտեք այսօր`,
    `Այսօր կստանաք ${randomEmoji.name} ${randomEmoji.emoji} նամակով`,
    `${randomEmoji.name}֊ով ${randomEmoji.emoji} աղցանից վախեցի`,
    `${randomEmoji.name}֊ից ${randomEmoji.emoji} վազեք ձախ`,
    `${randomEmoji.name}ը ${randomEmoji.emoji} արագ չի կծը, մի լարվի այսօր`,
    `${randomEmoji.name}֊ով ${randomEmoji.emoji} պաղպաղակ փորձեք`,
    `${randomEmoji.name}֊ը ${randomEmoji.emoji} ձագա ունենալու`,
    `Կարմիր ${randomEmoji.name}֊ը ${randomEmoji.emoji} կաշին չի փոխում`,
    `${randomEmoji.name}֊ը ${randomEmoji.emoji} ${randomEmoji.name}֊ի ծառից հեռու չի ընկնում`,
    `կատաղած ${randomEmoji.name}֊ից ${randomEmoji.emoji} վախեցի`,
    `կատաղած ${randomEmoji.name}֊ից ${randomEmoji.emoji} մի վախեցի`,
    `մի եղիր ${randomEmoji.name}֊ի ${randomEmoji.emoji} պես, միշտ դեպի աջ`,
    `մի եղիր ${randomEmoji.name}֊ի ${randomEmoji.emoji} պես, միշտ դեպի վեր`,
    `մի եղիր ${randomEmoji.name}֊ի ${randomEmoji.emoji} պես, միշտ դեպի ձախ`,
    `ո՞վա քեզ հորինել այ ${randomEmoji.name} ${randomEmoji.emoji}`,
    `Հերիքա խոսեք ${randomEmoji.name}֊ի ${randomEmoji.emoji} մասին`,
    `ապահովագրեք վայրի ${randomEmoji.name}֊երին ${randomEmoji.emoji}`,
    `Գիժը մի քար գցեց, հազար ${randomEmoji.name} ${randomEmoji.emoji} չկարացին հանել:`,
    `Մարդ ու կնիկ կռվեցին, ${randomEmoji.name}ը ${randomEmoji.emoji} թոնիրը գցեցեին:`,
    `Այսօր կտեսնես ${randomEmoji.name}ճի ${randomEmoji.emoji} ձևով ամպ`,
    `Լարված ${randomEmoji.name}֊ները ${randomEmoji.emoji} գալիս են քեզ մոտ`,
    `Մի ${randomEmoji.name}֊ը ${randomEmoji.emoji}, որ չես կարա կտրես, պաչի դիր գլխիդ`,
    `${randomEmoji.name}֊ը ${randomEmoji.emoji} ինչ գիտի նուշն ինչ ա:`,
    `զարգացած ${randomEmoji.name} ${randomEmoji.emoji} լինես էսօր`,
    `Մեղրը ծախողը ${randomEmoji.name} ${randomEmoji.emoji} կլպստի:`,
    `Մարդուս բարեկամը իր ${randomEmoji.name}ն ${randomEmoji.emoji} է:`,
    `Ուրագը իրա ${randomEmoji.name}ը ${randomEmoji.emoji} չի տաշի:`,
    `Մորը թախտ, աղջկանը՝ ${randomEmoji.name} ${randomEmoji.emoji}:`,
    `Շատ ծիծաղը ${randomEmoji.name} ${randomEmoji.emoji} կբերի:`,
    `Սիրուն ${randomEmoji.name}-ի ${randomEmoji.emoji} ծոցը պարկի, գեշ ${randomEmoji.name}-ի ${randomEmoji.emoji} ձեռի հացը կեր:`,
    `Մարդամիջի մարդ ունենամ, հազար ${randomEmoji.name} ${randomEmoji.emoji} պարտք ունենեամ:`,
  ];

  return գուշակոիթյուն[Math.round((գուշակոիթյուն.length - 1) * Math.random())];
}

const job = new CronJob(
  "0 0 13 * * *",
  () => {
    client.postStatus(getPrediction()).then(console.log).catch(console.log);
  },
  null,
  true
);

const job2 = new CronJob(
  "0 30 20 * * *",
  () => {
    client.postStatus(getMoonPhaseEmoji()).then(console.log).catch(console.log);
  },
  null,
  true
);

job.start();
job2.start();

client.postStatus(getMoonPhaseEmoji()).then(console.log).catch(console.log);
