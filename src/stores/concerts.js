import { defineStore } from 'pinia';

const initialConcerts = [
	{ 
		id: 1, 
		title: 'Magical Mirai 2024', 
		date: '2024-12-15', 
		time: '19:00 JST', 
		platform: 'YouTube Live', 
		price: 25.00, 
		image: 'images/concerts/magical-mirai-2024.jpg', 
		description: 'Join us for the annual Magical Mirai concert featuring new songs and special guests!', 
		ticketsRemaining: 45 
	},
	{ 
		id: 2, 
		title: 'Winter Wonder Concert', 
		date: '2024-12-20', 
		time: '20:00 EST', 
		platform: 'VRChat', 
		price: 15.00, 
		image: 'images/concerts/winter-wonder-concert.jpg', 
		description: 'A magical winter-themed concert in VRChat with interactive elements!', 
		ticketsRemaining: 12 
	},
	{ 
		id: 3, 
		title: 'New Year Celebration', 
		date: '2024-12-31', 
		time: '23:00 GMT', 
		platform: 'Twitch', 
		price: 20.00, 
		image: 'images/concerts/new-year-celebration.jpg', 
		description: 'Ring in the new year with Miku! Special countdown performance.', 
		ticketsRemaining: 20 
	},
	{ 
		id: 4, 
		title: 'Spring Festival Live', 
		date: '2025-03-21', 
		time: '18:00 JST', 
		platform: 'YouTube Live', 
		price: 25.00, 
		image: 'images/concerts/spring-festival-live.png', 
		description: 'Celebrate spring with cherry blossoms and beautiful melodies!', 
		ticketsRemaining: 0 
	},
	{ 
		id: 5, 
		title: 'Metaverse Tour 2025', 
		date: '2025-04-10', 
		time: '19:30 PST', 
		platform: 'Metaverse', 
		price: 30.00, 
		image: 'images/concerts/metaverse-tour-2025.png', 
		description: 'Explore the metaverse with Miku in this groundbreaking virtual tour!', 
		ticketsRemaining: 80 
	},
	{ 
		id: 6, 
		title: 'Summer Sonic Special', 
		date: '2025-07-15', 
		time: '17:00 JST', 
		platform: 'YouTube Live', 
		price: 25.00, 
		image: 'images/concerts/summer-sonic-special.png', 
		description: 'Hot summer vibes with energetic performances and fan favorites!', 
		ticketsRemaining: 15 
	}
];

export const useConcertsStore = defineStore('concerts', {
	state: () => ({
		concerts: initialConcerts,
	}),
	getters: {
		allConcerts: (state) => state.concerts,
		getConcertById: (state) => (id) => state.concerts.find(c => c.id === id)
	},
	actions: {
		updateTicketsRemaining(concertId, amountChange) {
			const concert = this.concerts.find(c => c.id === concertId);
			if (concert) {
				concert.ticketsRemaining += amountChange;
				if (concert.ticketsRemaining < 0) {
					concert.ticketsRemaining = 0;
				}
			}
		}
	}
});
