// lib/reviews.ts

export interface Review {
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
    profile_photo_url?: string;
}

export interface ReviewsData {
    business_name: string;
    overall_rating: number;
    total_reviews: number;
    place_id: string;
    reviews: Review[];
}

const reviewsData: ReviewsData = {
    business_name: "Your Safari Company",
    overall_rating: 4.9,
    total_reviews: 7, // your actual count from Google Maps
    place_id: "ChIJy5_khdERLxgRyQKiM5NNXlg",
    reviews: [
        {
            author_name: "Sarah M.",
            rating: 5,
            relative_time_description: "2 weeks ago",
            text: "Absolutely breathtaking experience. Our guide knew every animal by name and their habits. We saw the Big Five in just two days — something we never expected. The camp was luxurious yet felt perfectly at home in the wilderness. Will be back without a doubt.",
            profile_photo_url: "",
        },
        {
            author_name: "James & Linda K.",
            rating: 5,
            relative_time_description: "1 month ago",
            text: "We've done safaris in Tanzania and South Africa before, but this topped them all. The attention to detail from the team was outstanding. Every meal, every game drive, every sunset was perfectly curated. Worth every penny.",
            profile_photo_url: "",
        },
        {
            author_name: "Thomas R.",
            rating: 5,
            relative_time_description: "3 months ago",
            text: "Exceptional from start to finish. Booking was smooth, transfers were on time, and the guides were incredibly knowledgeable. Watching a lion hunt at dawn from an open vehicle is something I'll never forget.",
            profile_photo_url: "",
        },
        {
            author_name: "Anika V.",
            rating: 5,
            relative_time_description: "3 months ago",
            text: "I travelled solo and was a little nervous, but the team made me feel completely safe and welcome. The private game drive on day 3 was spectacular. Highly recommend for solo female travellers.",
            profile_photo_url: "",
        },
        {
            author_name: "David & Priya N.",
            rating: 5,
            relative_time_description: "4 months ago",
            text: "Our honeymoon couldn't have been more magical. The surprise sundowner setup in the bush left us speechless. Every staff member went out of their way to make us feel special. This is the gold standard for safari operators.",
            profile_photo_url: "",
        },
        {
            author_name: "Chris O.",
            rating: 5,
            relative_time_description: "5 months ago",
            text: "Third time with this company and they just keep getting better. The new camp in Samburu is stunning. Saw reticulated giraffes and Grevy's zebras — species you only find in northern Kenya. A truly unique itinerary.",
            profile_photo_url: "",
        },
        {
            author_name: "Natalie F.",
            rating: 5,
            relative_time_description: "6 months ago",
            text: "Booked a custom 10-day itinerary and they nailed every detail. The team clearly loves what they do — that passion comes through in everything from the morning briefings to the campfire stories at night.",
            profile_photo_url: "",
        },
        {
            author_name: "Marco & Elena B.",
            rating: 5,
            relative_time_description: "7 months ago",
            text: "We travelled with two young kids (ages 6 and 9) and were worried it might be challenging. The team was so patient and engaging with the children — they turned every drive into an adventure. Our kids are now obsessed with wildlife.",
            profile_photo_url: "",
        },
    ],
};

export default reviewsData;