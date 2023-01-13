export default {
    0:{
        id: 0,
        title: 'Classic',
        figureCount: 8,
        maxScore: 96,
        infoLink: '',
        figures:{
            0: {
                title: 'Hålla rent (Clearing)',
                img: require(`../assets/img/figures/classic/1.png`),
                description: ``
            },
            1: {
                title: 'Gardering',
                img: require(`../assets/img/figures/classic/2.png`),
                description: ``
            },
            2: {
                title: 'Utslagning plus helst invick',
                img: require(`../assets/img/figures/classic/3.png`),
                description: ``
            },
            3: {
                title: 'Inläggning',
                img: require(`../assets/img/figures/classic/4.png`),
                description: ``
            },
            4: {
                title: 'Framknack',
                img: require(`../assets/img/figures/classic/5.png`),
                description: ``
            },
            5: {
                title: 'Utslagning av garderad sten',
                img: require(`../assets/img/figures/classic/6.png`),
                description: ``
            },
            6: {
                title: 'Inläggning genom port',
                img: require(`../assets/img/figures/classic/7.png`),
                description: ``
            },
            7: {
                title: 'Indelning (Klyvning)',
                img: require(`../assets/img/figures/classic/8.png`),
                description: ``
            }
        },
        credits: '',
        medals: [
            {
                title: 'BRONS',
                score: {m: 40, w: 35}
            },
            {
                title: 'SILVER',
                score: {m: 50, w: 45}
            },
            {
                title: 'GULD',
                score: {m: 60, w: 55}
            },
            {
                title: 'ELITMÄRKET',
                score: {m: 70, w: 65}
            }
        ],
        medalsURL: 'https://figur.snoffla.com/medals'
    },
    1:{
        id: 1,
        title: 'Modern',
        figureCount: 10,
        maxScore: 120,
        infoLink: '',
        figures:{
            0: {
                title: 'Dragning',
                img: require(`../assets/img/figures/modern/1.jpg`),
                description: 
                `Poäng fördelas enligt följande: Tre poäng om stenen täcker eller tangerar 1-fotscirkeln. Två poäng om stenen tangerar eller stannar inom 4-fotscirkeln. En poäng om stenen tangerar eller stannar inom 8-fotscirkeln.\n\nEtt poängs avdrag om stenen är helt bakom teelinjen
                `
            },
            1: {
                title: 'Utslagning av garderad sten',
                img: require(`../assets/img/figures/modern/2.jpg`),
                description: 
                `En sten placeras på Mixed Dubbel markeringen som är närmast hoglinjen. En sten placeras på bakre delen av enfoten, så att knappen precis är synlig.\n\nFör poäng ska liggstenen i boet slås helt ut.\n\n3 poäng om den förplacerade stenen tangerar eller stannar inom inom 4-fotscirkeln\n\n2 poäng om den förplacerade stenen tangerar eller stannar inom 8-fotscirkeln.\n\n1 poäng om den förplacerade stenen tangerar eller stannar inom spelstenen kvar i 12- fotscirkeln.
                `
            },
            2: {
                title: 'Knacka bakom tee',
                img: require(`../assets/img/figures/modern/3.jpg`),
                description: 
                `En liggsten placeras där den tangerar topp fyrfot, mitt över centerlinan.\n\n3 poäng om den förplacerade stenen knackas så den är helt bakom tee och stannar inom 4-fotscirkeln\n\n2 poäng om den förplacerade stenen knackas helt bakom tee och stannar inom 8- fotscirkeln\n\n1 poäng om den förplacerade stenen knackas helt bakom tee och stannar inom 12- fotscirkeln
                `
            },
            3: {
                title: 'Rak skjutning',
                img: require(`../assets/img/figures/modern/4.jpg`),
                description: 
                `En sten placeras på Mixed-Dubbel markeringen närmast boet, mitt över centerlinan. En sten placeras i boet, mitt över centerlinan och så att den precis tangerar fyrfoten i framkant.\n\nDen förplacerade stenen i boet måste lämna boet helt för poäng.\n\n3 poäng om skjutstenen tangerar eller ligger kvar i 8-fotscirkeln \n\n2 poäng om skjutstenen tangerar eller ligger kvar i 12-fotscirkeln\n\n1 poäng om skjutstenen vickar av.
                `
            },
            4: {
                title: 'Dragning runt cornern',
                img: require(`../assets/img/figures/modern/5.jpg`),
                description: 
                `Två stenar placeras på Mixed Dubbelmarkeringarna för Power Play. En på vänster och en på höger sida, mitt över den mellersta markeringen. Spelstenen ska tangera den imaginära linjen mellan 8-fotscirkeln och den förplacerade stenen. Vid tveksamma fall ska vi hellre fira än fälla.\n\n3 poäng: Dragning in i boet framför tee-linjen i linjen med 8-fotscirkeln bakom garden.\n\n2 poäng: Dragning in i boet som tangerar tee-linjen i linjen med 8-fotscirkeln bakom garden.\n\n1 poäng: Dragning in i boet bakom tee-linjen i linjen med 8-fotscirkeln bakom garden.
                `
            },
            5: {
                title: 'Dubbeln',
                img: require(`../assets/img/figures/modern/6.jpg`),
                description: 
                `Placera två stenar på vardera sida, helt inne i 8-fotscirkeln, som tangerar tee-linjen och 12-fotscirkeln framför tee. Placera också en sten i bakkant 4-fotscirkeln över centerlinan.\n\nFörsök 1 och tre är på den högra dubbeln. Försök 2 och 4 är på den vänstra dubbeln. Valfri rotation på samtliga försök.\n\n3 poäng om båda båda förplacerade stenarna slås ut ur boet samt spelstenen stannar i 4-fotscirkeln.\n\n2 poäng om båda båda förplacerade stenarna slås ut ur boet samt spelstenen stannar i 8-fotscirkeln.\n\n1 poäng om båda båda förplacerade stenarna slås ut ur boet samt spelstenen stannar i 12-fotscirkeln.
                `
            },
            6: {
                title: 'Ticken',
                img: require(`../assets/img/figures/modern/7.jpg`),
                description: 
                `En sten är förplacerad som centergard över den mittersta mixed-dubbelmarkeringen. För poäng behövs kontakt med den förplacerade stenen. Ingen av stenarna får vara kvar på centerlinjen. Den förplacerade stenen ska vara kvar i spel.\n\n3 poäng: Båda stenarna stannar utanför Mixed Dubbel markeringarna för Power Play. Spelstenen får vicka av.\n\n2 poäng: En av stenarna är utanför Mixed Dubbel markeringen för Power Play och en är innanför. Alternativt att den förplacerade stenen är kvar innanför markeringen och spelstenen vickar av.\n\n1 poäng: Båda stenarna stannar innanför Mixed Dubbel markeringen för Power Play.
                `
            },
            7: {
                title: 'Clearing av två stenar',
                img: require(`../assets/img/figures/modern/8.jpg`),
                description: 
                `Två stenar placeras på Mixed Dubbel Power Point markeringarna närmast boet. En sten placeras över 1-fotscirkeln. Den förplacerade stenen i boet måste slås helt utanför boet för poäng.\n\n3 poäng om alla stenar spelas ur boet. Spelstenen samt båda liggstenar.\n\n2 poäng om skjutstenen stannar i boet utanför 4-fotscirkeln\n\n1 poäng om skjutstenen stannar i boet i 4-fotscirkeln.
                `
            },
            8: {
                title: 'Vicka bakom cornern',
                img: require(`../assets/img/figures/modern/9.jpg`),
                description: 
                `En sten förplaceras över centerlinan i boet så att den tangerar 1-fotscirkeln framför tee. Samt två stenar förplaceras på Mixed Dubbel Power Point markeringarna (en på vardera sida).\n\nFörsök 1 och 3 ska vicka bakom den högra garden. Försök 2 och 4 ska vicka bakom den vänstra garden. Noll poäng om spelstenen ligger kvar på centerlinjen eller om den vickar åt fel håll. Valfri rotation på samtliga försök.\n\n3 poäng: Spelstenen vickar och stanna i eller tangera 12-fotscirkeln\n\n2 poäng: Spelstenen vickar och stannar helt i 8-fotscirkeln\n\n1 poäng: Spelstenen vickar och stannar i eller tangera 4-fotscirkeln
                `
            },
            9: {
                title: 'Frysning',
                img: require(`../assets/img/figures/modern/10.jpg`),
                description: 
                `En sten förplaceras över den mittersta Mixed Dubbelmarkeringen på centerlinjen och en sten förplaceras helt i bakkanten av fyrfotscirkeln där den tangerar 8-fotscirkeln. Också den över centerlinjen.\n\nOm spelstenen stannar framför 4-fotscirkeln är det noll poäng.\n\n3 poäng: Spelstenen stannar helt inne i 4-fotscirkeln och tangerar centerlinjen. Spelstenen får knacka den förplacerade stenen men den förplacerade stenen måste stanna kvar i 4-fotscirkeln.\n\n2 poäng: Spelstenen stannar helt inne i 4-fotscirkeln och tangerar centerlinjen. Spelstenen får knacka liggstenen och liggstenen knackas helt inne i 8-fotscirkeln dock inte tangera 12-fotscirkeln eller att spelstenen stannar helt inne i 4ft och tangera 1ft linjen utan att knacka liggstenen.\n\n1 poäng: Spelstenen stannar delvis inne i 4-fotscirkeln, framför tee och tangerar centerlinjen eller 1-foten.
                `
            }
        },
        credits: 'Modern figur framtagen av James Dryburgh och Sumpans juniorer',
        medals: [],
        medalsURL: ''
    },
    2:{
        id: 2,
        title: 'Kids',
        figureCount: 5,
        maxScore: 60,
        infoLink: '',
        figures:{
            0: {
                title: 'Centerguard',
                img: require(`../assets/img/figures/kids/1.jpg`),
                description: 
                `3 poäng: Spelstenen stannar inom ramen för 4-fotscirkeln och framför boet.\n\n2 poäng: Spelstenen stannar inom ramen för 4-fotscirkeln och framför tee.\n\n1 poäng: Spelstenen stannar inom ramen för 12-fotscirkeln och framför boet.
                `
            },
            1: {
                title: 'Slagning',
                img: require(`../assets/img/figures/kids/2.jpg`),
                description: 
                `En förplacerad sten täcker 1-fotscirkeln.\n\n3 poäng: Den förplacerade stenen slås ur spel och spelstenen stannar kvar i boet.\n\n2 poäng: Den förplacerade stenen slås ur spel och spelstenen vickar ur boet.\n\n1 poäng: Den förplacerade stenen träffas och stannar kvar i boet.
                `
            },
            2: {
                title: 'Cornerguard',
                img: require(`../assets/img/figures/kids/3.jpg`),
                description: `3 poäng: Spelstenen stannar framför boet mellan 4-fotscirklen och 12-fotscirkeln.\n\n2 poäng: Spelstenen stannar framför tee mellan 4-fotscirklen och 12-fotscirkeln.\n\n1 poäng: Spelstenen är inom 4-fotscirkeln i linje framför tee
                `
            },
            3: {
                title: 'Knacka',
                img: require(`../assets/img/figures/kids/4.jpg`),
                description: 
                `En förplacerad sten på mittersta Mixed-Dubbel markeringen över centerlinjen.\n\n3 poäng: Den förplacerade stenen knackas till 8-fotscirkeln.\n\n2 poäng: Den förplacerade stenen knackas till boet\n\n1 poäng: Spelstenen får kontakt med den förplacerade och båda stenar är kvar i spelet
                `
            },
            4: {
                title: 'Dragning',
                img: require(`../assets/img/figures/kids/5.jpg`),
                description: 
                `3 poäng: Till 8-fotscirkeln.\n\n2 poäng: Till 12-fotscirkeln\n\n1 poäng: Dragningen är med i spel (passerat hoglinjen)
                `
            },
        },
        credits: 'Kidsfigur framtagen av James Dryburgh och Sumpans juniorer',
        medals: [],
        medalsURL: ''
    }
}