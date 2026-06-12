/**
 * African Proverbs — cycling display
 */
const africanProverbs = [
{flag:"\u{1F1EC}\u{1F1ED}",nation:"Ghana",text:"Wisdom is like a baobab tree; no one individual can embrace it."},
{flag:"\u{1F1F3}\u{1F1EC}",nation:"Nigeria",text:"Until the lion learns to write, every story will glorify the hunter."},
{flag:"\u{1F1F3}\u{1F1EC}",nation:"Nigeria",text:"The child who washes his hands may dine with kings."},
{flag:"\u{1F30D}",nation:"East Africa",text:"If you want to go fast, go alone. If you want to go far, go together."},
{flag:"\u{1F1EA}\u{1F1F9}",nation:"Ethiopia",text:"When spider webs unite, they can tie up a lion."},
{flag:"\u{1F1FF}\u{1F1E6}",nation:"South Africa",text:"Ubuntu: I am because we are."},
{flag:"\u{1F30D}",nation:"Africa",text:"The child who is not embraced by the village will burn it down to feel its warmth."},
{flag:"\u{1F1EC}\u{1F1ED}",nation:"Ghana",text:"The ruin of a nation begins in the homes of its people."},
{flag:"\u{1F1EC}\u{1F1F3}",nation:"Guinea",text:"The one who asks questions never loses the way."},
{flag:"\u{1F1E7}\u{1F1EB}",nation:"Burkina Faso",text:"What an elder sees sitting down, a youth cannot see standing up."},
{flag:"\u{1F1F3}\u{1F1EA}",nation:"Niger",text:"A single bracelet does not jingle."},
{flag:"\u{1F30D}",nation:"West Africa",text:"One finger cannot pick up a pebble."},
{flag:"\u{1F1F0}\u{1F1EA}",nation:"Kenya",text:"Sticks in a bundle are unbreakable."},
{flag:"\u{1F1F1}\u{1F1F7}",nation:"Liberia",text:"One broomstick breaks easily; a bundle does not."},
{flag:"\u{1F1E8}\u{1F1F2}",nation:"Cameroon",text:"A single hand cannot tie a bundle."},
{flag:"\u{1F1F9}\u{1F1EC}",nation:"Togo",text:"The hand washes the other."},
{flag:"\u{1F1EC}\u{1F1E6}",nation:"Gabon",text:"A canoe moves because many paddle."},
{flag:"\u{1F1F2}\u{1F1FF}",nation:"Mozambique",text:"The canoe reaches shore by many paddles."},
{flag:"\u{1F1F8}\u{1F1F1}",nation:"Sierra Leone",text:"The village raises the child."},
{flag:"\u{1F1E8}\u{1F1E9}",nation:"DR Congo",text:"A child belongs not to one parent but to the community."},
{flag:"\u{1F1E7}\u{1F1FC}",nation:"Botswana",text:"A calf belongs to the village."},
{flag:"\u{1F1EC}\u{1F1F3}",nation:"Guinea",text:"Knowledge is like a garden; if it is not cultivated, it cannot be harvested."},
{flag:"\u{1F30D}",nation:"West Africa",text:"The fool speaks; the wise person listens."},
{flag:"\u{1F1EC}\u{1F1ED}",nation:"Ghana",text:"A wise person who knows proverbs can reconcile difficulties."},
{flag:"\u{1F1E8}\u{1F1F2}",nation:"Cameroon",text:"The ear that listens is wiser than the mouth that speaks."},
{flag:"\u{1F1F8}\u{1F1F3}",nation:"Senegal",text:"One who listens learns."},
{flag:"\u{1F1F0}\u{1F1EA}",nation:"Kenya",text:"A person who uses force is afraid of reasoning."},
{flag:"\u{1F1F8}\u{1F1F4}",nation:"Somalia",text:"Advice is a debt paid forward."},
{flag:"\u{1F1F8}\u{1F1F4}",nation:"Somalia",text:"A wise man is known by his actions."},
{flag:"\u{1F1EA}\u{1F1F9}",nation:"Ethiopia",text:"He who learns, teaches."},
{flag:"\u{1F1F9}\u{1F1EC}",nation:"Togo",text:"The one who learns is never poor."},
{flag:"\u{1F1F1}\u{1F1F7}",nation:"Liberia",text:"Do not look where you fell, but where you slipped."},
{flag:"\u{1F1F2}\u{1F1FC}",nation:"Malawi",text:"Little by little fills the basket."},
{flag:"\u{1F1F2}\u{1F1F1}",nation:"Mali",text:"The river is filled by many streams."},
{flag:"\u{1F1F2}\u{1F1FA}",nation:"Mauritius",text:"Many drops make an ocean."},
{flag:"\u{1F1EC}\u{1F1FC}",nation:"Guinea-Bissau",text:"Many hands make light work."},
{flag:"\u{1F1EC}\u{1F1F2}",nation:"Gambia",text:"The patient one eats ripe fruit."},
{flag:"\u{1F1F8}\u{1F1E8}",nation:"Seychelles",text:"Patience catches fish."},
{flag:"\u{1F1E9}\u{1F1FF}",nation:"Algeria",text:"Patience is the key to relief."},
{flag:"\u{1F1F9}\u{1F1F3}",nation:"Tunisia",text:"Patience is beautiful."},
{flag:"\u{1F1F2}\u{1F1F7}",nation:"Mauritania",text:"The desert rewards patience."},
{flag:"\u{1F1F0}\u{1F1F2}",nation:"Comoros",text:"The ocean teaches patience."},
{flag:"\u{1F1E9}\u{1F1EF}",nation:"Djibouti",text:"The patient camel reaches water."},
{flag:"\u{1F1F2}\u{1F1EC}",nation:"Madagascar",text:"The rice field grows by patience."},
{flag:"\u{1F1F9}\u{1F1E9}",nation:"Chad",text:"A journey is completed one step at a time."},
{flag:"\u{1F1EC}\u{1F1F6}",nation:"Equatorial Guinea",text:"The path is made by walking."},
{flag:"\u{1F1E7}\u{1F1EE}",nation:"Burundi",text:"A tree cannot stand without roots."},
{flag:"\u{1F1E8}\u{1F1EE}",nation:"Ivory Coast",text:"The river never forgets its source."},
{flag:"\u{1F1F8}\u{1F1F8}",nation:"South Sudan",text:"The river remembers its source."},
{flag:"\u{1F1F3}\u{1F1E6}",nation:"Namibia",text:"The track reveals the animal."},
{flag:"\u{1F1E6}\u{1F1F4}",nation:"Angola",text:"Rain beats the leopard\u2019s skin but does not wash away its spots."},
{flag:"\u{1F1FF}\u{1F1FC}",nation:"Zimbabwe",text:"The baboon laughs at the monkey\u2019s tail."},
{flag:"\u{1F1FA}\u{1F1EC}",nation:"Uganda",text:"Rain does not fall on one roof alone."},
{flag:"\u{1F1E8}\u{1F1FB}",nation:"Cape Verde",text:"The sea unites what the land divides."},
{flag:"\u{1F1F8}\u{1F1F9}",nation:"S\u00e3o Tom\u00e9 & Pr\u00edncipe",text:"The sea teaches humility."},
{flag:"\u{1F1F8}\u{1F1F3}",nation:"Senegal",text:"A guest is God\u2019s gift."},
{flag:"\u{1F1F1}\u{1F1FE}",nation:"Libya",text:"Trust in God, but tie your camel."},
{flag:"\u{1F1EA}\u{1F1F7}",nation:"Eritrea",text:"A good name is better than riches."},
{flag:"\u{1F1F7}\u{1F1FC}",nation:"Rwanda",text:"Unity is the foundation of strength."},
{flag:"\u{1F1F9}\u{1F1FF}",nation:"Tanzania",text:"Unity is strength, division is weakness."},
{flag:"\u{1F1EA}\u{1F1EC}",nation:"Egypt",text:"Consult the experienced before taking action."},
{flag:"\u{1F1F2}\u{1F1FA}",nation:"Mauritius",text:"The sugarcane bends but does not break."},
{flag:"\u{1F1FF}\u{1F1F2}",nation:"Zambia",text:"The patient bird eats the fattest worm."},
{flag:"\u{1F1F8}\u{1F1E9}",nation:"Sudan",text:"The one who plants dates does not expect to eat them."},
{flag:"\u{1F1F8}\u{1F1F8}",nation:"South Sudan",text:"Cattle unite the people."},
{flag:"\u{1F1FF}\u{1F1FC}",nation:"Zimbabwe",text:"The axe forgets; the tree remembers."},
{flag:"\u{1F1FA}\u{1F1EC}",nation:"Uganda",text:"A roaring lion kills no game."},
{flag:"\u{1F1F9}\u{1F1FF}",nation:"Tanzania",text:"The chameleon looks in all directions before moving."},
{flag:"\u{1F1F3}\u{1F1EC}",nation:"Nigeria",text:"A borrowed cloth does not keep one warm for long."},
{flag:"\u{1F1FA}\u{1F1EC}",nation:"Uganda",text:"He who climbs a good tree deserves a push."},
{flag:"\u{1F1F2}\u{1F1E6}",nation:"Morocco",text:"The eye never forgets what the heart has seen."},
{flag:"\u{1F1F0}\u{1F1EA}",nation:"Kenya",text:"The rainmaker does not fear the clouds."},
{flag:"\u{1F1EC}\u{1F1ED}",nation:"Ghana",text:"A drum sounds loud because it is empty inside."},
{flag:"\u{1F1EA}\u{1F1F9}",nation:"Ethiopia",text:"The hyena may change its den, but not its habits."}
];

(function() {
    var el = document.getElementById('proverbText');
    if (!el || !africanProverbs.length) return;
    var idx = Math.floor(Math.random() * africanProverbs.length);
    function show() {
        var p = africanProverbs[idx];
        el.textContent = p.flag + ' ' + p.text + ' \u2014 ' + p.nation;
        el.style.opacity = '1';
        setTimeout(function() {
            el.style.opacity = '0';
            setTimeout(function() {
                idx = (idx + 1) % africanProverbs.length;
                show();
            }, 1200);
        }, 8000);
    }
    show();
})();
