export default function HomePage() {
  return (
    <div dangerouslySetInnerHTML={{ 
      __html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuitedStay - The World's Most Exclusive Hotels</title>
    <meta name="description" content="Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats. Curated collection of the world's finest hotels.">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="SuitedStay - The World's Most Exclusive Hotels">
    <meta property="og:description" content="Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats.">
    <meta property="og:url" content="https://suited-stay.vercel.app">
    <meta property="og:site_name" content="SuitedStay">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SuitedStay - The World's Most Exclusive Hotels">
    <meta name="twitter:description" content="Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats.">
    
    <!-- Critical CSS inline -->
    <style>
        .text-gold { color: #c5a46d; }
        .bg-gold { background-color: #c5a46d; }
        .border-gold { border-color: #c5a46d; }
        body { font-display: swap; }
    </style>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white font-sans text-sm leading-relaxed text-gray-700">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="/" class="text-xl font-bold text-gray-900">
                    Suited<span class="text-gold">Stay</span>
                </a>
                <div class="flex items-center space-x-4">
                    <a href="/claim" class="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        List Your Property
                    </a>
                    <a href="/login" class="text-gray-600 hover:text-gray-900 text-sm">Login</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-4xl mx-auto px-6 py-16 text-center">
            <!-- Hero Badges -->
            <div class="flex items-center justify-center gap-4 mb-6 flex-wrap">
                <div class="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Curated Collection
                </div>
                <div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span class="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    Ultra-Luxury
                </div>
                <div class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    World's Finest
                </div>
            </div>

            <!-- Hero Title -->
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                The World's Most 
                <span class="text-gold">Exclusive Hotels</span>
            </h1>
            
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats. Every property is curated for the discerning traveler.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
                <a href="#featured-hotels" class="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Explore Collection
                </a>
                <a href="/claim" class="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    List Your Property
                </a>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">50+</div>
                    <div class="text-sm text-gray-600">Luxury Properties</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">25+</div>
                    <div class="text-sm text-gray-600">Global Cities</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">9.2</div>
                    <div class="text-sm text-gray-600">Avg Rating</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Featured Hotels Section -->
    <section id="featured-hotels" class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Handpicked luxury hotels that redefine hospitality and elegance
                </p>
            </div>

            <!-- Sample Hotel Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Sample Hotel Card 1 -->
                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                        <div class="absolute top-3 left-3">
                            <div class="bg-emerald-500 text-white text-sm font-bold w-12 h-12 rounded-xl flex items-center justify-center">
                                9.2
                            </div>
                        </div>
                        <div class="absolute bottom-3 left-3">
                            <div class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                Ultra-Luxury
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">The Dorchester</h3>
                        <p class="text-sm text-gray-600 mb-3">London • Mayfair</p>
                        <p class="text-sm text-gray-700 mb-4 line-clamp-2">
                            Iconic luxury hotel on Park Lane, renowned for world-class service and timeless elegance.
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center text-yellow-400">
                                ★★★★★
                                <span class="text-sm text-gray-600 ml-2">5 stars</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900">$$$$</span>
                        </div>
                    </div>
                </div>

                <!-- Sample Hotel Card 2 -->
                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div class="h-48 bg-gradient-to-br from-blue-200 to-blue-300 relative">
                        <div class="absolute top-3 left-3">
                            <div class="bg-emerald-500 text-white text-sm font-bold w-12 h-12 rounded-xl flex items-center justify-center">
                                9.0
                            </div>
                        </div>
                        <div class="absolute bottom-3 left-3">
                            <div class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                Ultra-Luxury
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Four Seasons at Tower Bridge</h3>
                        <p class="text-sm text-gray-600 mb-3">London • Tower Bridge</p>
                        <p class="text-sm text-gray-700 mb-4 line-clamp-2">
                            Contemporary luxury with breathtaking views of the Thames and Tower Bridge.
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center text-yellow-400">
                                ★★★★★
                                <span class="text-sm text-gray-600 ml-2">5 stars</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900">$$$$</span>
                        </div>
                    </div>
                </div>

                <!-- Sample Hotel Card 3 -->
                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div class="h-48 bg-gradient-to-br from-green-200 to-green-300 relative">
                        <div class="absolute top-3 left-3">
                            <div class="bg-emerald-500 text-white text-sm font-bold w-12 h-12 rounded-xl flex items-center justify-center">
                                9.1
                            </div>
                        </div>
                        <div class="absolute bottom-3 left-3">
                            <div class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                Ultra-Luxury
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Beaverbrook</h3>
                        <p class="text-sm text-gray-600 mb-3">Surrey • Surrey Hills</p>
                        <p class="text-sm text-gray-700 mb-4 line-clamp-2">
                            Elegant country house hotel set within 162 hectares of Surrey countryside.
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center text-yellow-400">
                                ★★★★★
                                <span class="text-sm text-gray-600 ml-2">5 stars</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-900">$$$$</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <a href="/hotels" class="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    View All Properties
                </a>
            </div>
        </div>
    </section>

    <!-- Why Choose SuitedStay -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose SuitedStay</h2>
                <p class="text-lg text-gray-600">
                    We curate only the finest luxury accommodations worldwide
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Curated Excellence</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        Every property is hand-selected for exceptional quality, service, and luxury standards.
                    </p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Verified Reviews</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        Our proprietary 10-point scoring system provides transparent, expert-verified ratings.
                    </p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Global Coverage</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        From cosmopolitan cities to remote paradises, discover luxury in every corner of the world.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="text-xl font-bold mb-4">
                        Suited<span class="text-gold">Stay</span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Curating the world's most exclusive luxury hotels for discerning travelers.
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Explore</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/hotels" class="text-gray-400 hover:text-white transition-colors">All Hotels</a></li>
                        <li><a href="/destinations" class="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
                        <li><a href="/luxury" class="text-gray-400 hover:text-white transition-colors">Ultra-Luxury</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Partners</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/claim" class="text-gray-400 hover:text-white transition-colors">List Your Property</a></li>
                        <li><a href="/partnership" class="text-gray-400 hover:text-white transition-colors">Partnership Program</a></li>
                        <li><a href="/media" class="text-gray-400 hover:text-white transition-colors">Media Kit</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="/about" class="text-gray-400 hover:text-white transition-colors">About</a></li>
                        <li><a href="/privacy" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © 2025 SuitedStay. All rights reserved.
                </p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.74-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.90-11.988C24.007 5.367 18.641.001.012.001z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>` 
    }} />
  )
}
