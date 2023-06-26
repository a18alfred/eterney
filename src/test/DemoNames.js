export const getDemoNamesV2 = (initialId) => {
	let ids = [];
	let souls = {};

	let dobYear = 1900;
	let dobMonth = 1;
	let dobDay = 1;
	let dodYear = 2000;
	let dodMonth = 1;
	let dodDay = 1;
	let id = initialId;

	for (let i = 0; i < 14; i++) {
		souls[id] = {
			id: id,
			name: 'FULL NAME',
			bio: 'Briefly describe the person. Write kind words and your memories of the person.\n' +
				'With ETERNEY, the memory of the person will never disappear and will be available all over the world.\n' +
				'\n' +
				'Important! Once the smart contract begins to fill with real names, these examples will be deleted.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: 'FULL NAME',
			bio: 'Briefly describe the person. Write kind words and your memories of the person.\n' +
				'With ETERNEY, the memory of the person will never disappear and will be available all over the world.\n' +
				'\n' +
				'Important! Once the smart contract begins to fill with real names, these examples will be deleted.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: 'ПОЛНОЕ ИМЯ',
			bio: 'Кратко опишите человека. Напишите добрые слова и свои воспоминания об этом человеке.\n' +
				'С помощью ETERNEY память о человеке никогда не исчезнет и будет доступна во всем мире.\n' +
				'\n' +
				'Важно! Как только смарт-контракт начнет заполняться реальными именами, эти примеры будут удалены.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: 'NOMBRE COMPLETO',
			bio: 'Describe brevemente a la persona. Escribe palabras amables y tus recuerdos de la persona.\n' +
				'Con ETERNEY, el recuerdo de la persona nunca desaparecerá y estará disponible en todo el mundo.\n' +
				'\n' +
				'¡Importante! Una vez que el contrato inteligente comience a llenarse de nombres reales, estos ejemplos serán eliminados.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: '全名',
			bio: '简要描述一下这个人。写下亲切的话语和你对这个人的回忆。\n' +
				'有了ETERNEY，对这个人的记忆将永远不会消失，并将在全世界范围内提供。\n' +
				'\n' +
				'重要的是! 一旦智能合约开始填入真实姓名，这些例子将被删除。',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: 'VOLLSTÄNDIGER NAME',
			bio: 'Beschreiben Sie die Person kurz. Schreiben Sie freundliche Worte und Ihre Erinnerungen an die Person.\n' +
				'Mit ETERNEY wird die Erinnerung an die Person nie verschwinden und auf der ganzen Welt verfügbar sein.\n' +
				'\n' +
				'Wichtig! Sobald der intelligente Vertrag beginnt, sich mit echten Namen zu füllen, werden diese Beispiele gelöscht.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);

		id += 1;
		souls[id] = {
			id: id,
			name: 'NOM COMPLET',
			bio: 'Décrivez brièvement la personne. Écrivez des mots gentils et vos souvenirs de la personne.\n' +
				'Avec ETERNEY, le souvenir de la personne ne disparaîtra jamais et sera disponible dans le monde entier.\n' +
				'\n' +
				'Important ! Lorsque le contrat intelligent commencera à se remplir de noms réels, ces exemples seront supprimés.',
			dates: {
				dobYear: dobYear,
				dobMonth: dobMonth,
				dobDay: dobDay,
				dodYear: dodYear,
				dodMonth: dodMonth,
				dodDay: dodDay
			}
		};
		ids.push(id);
	}

	return {
		ids: ids,
		souls: souls
	};
};