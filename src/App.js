import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Zfir Royal",
    image: "/zfir_royal.jpg",
    price: 54.00,
    sizes: ["220g", "360g", "750g"],
    defaultSize: "360g"
  },
  {
    id: 2,
    name: "Chocolat Noir au Miel",
    image: "https://images.unsplash.com/photo-1542843137-8791a6904d14?w=400&h=400&fit=crop",
    price: 22.00,
    sizes: ["250g", "350g"],
    defaultSize: "250g"
  },
  {
    id: 3,
    name: "Miel Sauvage",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    price: 212.00,
    sizes: ["800g", "1200g"],
    defaultSize: "800g"
  },
  {
    id: 4,
    name: "Miel de Fleurs",
    image: "/miel_fleurs.jpg",
    price: 45.00,
    sizes: ["250g", "500g", "1000g"],
    defaultSize: "500g"
  }
];

export default function HoneyWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: ""
  });

  const [selectedSizes, setSelectedSizes] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.defaultSize;
      return acc;
    }, {})
  );

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  React.useEffect(() => {
    // Initial load logic here if needed
  }, []);

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    const existingItem = cartItems.find(item => item.id === product.id && item.size === selectedSize);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        (item.id === product.id && item.size === selectedSize)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, size: selectedSize, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert(`Merci ${customerInfo.fullName} ! Votre commande de ${cartTotal.toFixed(2)} DT a été enregistrée. Nous vous contacterons au ${customerInfo.phone}.`);
    setCartItems([]);
    setIsCartOpen(false);
    setCheckoutStep('cart');
    setCustomerInfo({ fullName: "", phone: "", city: "", address: "", notes: "" });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="text-white text-center py-3 px-4" style={{ backgroundColor: '#4a3728' }}>
        <p className="text-sm md:text-base font-semibold">
          Livraison gratuite à partir de 200 DT !
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img
                src="/logo_white.png"
                alt="Alsutan Logo"
                className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-full"
              />
              <div className="text-3xl md:text-5xl font-bold">
                <span className="text-amber-500">Alsutan</span>
                <p className="text-sm md:text-base text-gray-600 font-normal">depuis 1998</p>
              </div>
            </div>

            {/* Search Bar - Center */}
            <div className="flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher des produits ici..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                  className="absolute right-0 top-0 bottom-0 text-white px-6 rounded-r-lg transition-all hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: '#4a3728' }}
                  onClick={() => handleSearch({ target: { value: searchTerm } })}
                >
                  <Search size={18} />
                  Recherche
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <span className="text-2xl">🇫🇷</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-amber-500">
                <User size={24} />
                <div className="text-sm">
                  <p className="font-semibold">Mon compte</p>
                  <p className="text-gray-600 text-xs">S'identifier - Créer un compte</p>
                </div>
              </div>
              <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm md:text-base">
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Miel De Luxe</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Miel Pur</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Produits Apicoles</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Formules & Cocktail</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Miel Aux Fruits Secs</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Bsissa, Zrir & Crème</li>
              <li className="whitespace-nowrap px-3 py-2 hover:text-amber-500 cursor-pointer font-medium">Plus</li>
            </ul>
          </div>
        </nav>

        {/* Cart Button - Floating */}
        <div className="fixed right-4 top-32 md:top-24 z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#4a3728' }}
          >
            <ShoppingCart size={20} />
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold">Mon Panier</p>
              <p className="text-xs">TND {cartTotal.toFixed(2)}</p>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-amber-500 text-white rounded-full min-w-[24px] h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {checkoutStep === 'cart' ? (
                <>
                  <ShoppingCart size={24} /> Mon Panier ({cartCount})
                </>
              ) : (
                <>
                  <ChevronLeft
                    size={24}
                    className="cursor-pointer hover:text-amber-600 transition-colors"
                    onClick={() => setCheckoutStep('cart')}
                  />
                  Infos Livraison
                </>
              )}
            </h2>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutStep('cart');
              }}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {checkoutStep === 'cart' ? (
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Votre panier est vide</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-amber-600 font-semibold underline"
                    >
                      Continuer vos achats
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Format: {item.size}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="px-2 py-1 hover:bg-gray-100 border-r"
                            >-</button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="px-2 py-1 hover:bg-gray-100 border-l"
                            >+</button>
                          </div>
                          <p className="font-bold text-amber-600">{(item.price * item.quantity).toFixed(2)} DT</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <form id="orderForm" onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                    <p className="text-sm text-amber-800 font-medium">
                      🚚 Livraison à domicile payable à la réception.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom & Prénom</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Votre nom complet"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de Téléphone</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Votre numéro de portable"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ville</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        placeholder="Ex: Tunis"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Code Postal</label>
                      <input
                        type="text"
                        placeholder="1000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse Complète</label>
                    <textarea
                      required
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Rue, Immeuble, Appt..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notes de commande (Optionnel)</label>
                    <textarea
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      placeholder="Instructions spéciales, créneau de livraison..."
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                </div>
              </form>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-gray-50 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between text-lg font-bold">
                <span>{checkoutStep === 'cart' ? 'Total' : 'Total à payer'}</span>
                <span className="text-amber-600 text-2xl">{cartTotal.toFixed(2)} DT</span>
              </div>
              {checkoutStep === 'cart' ? (
                <>
                  <p className="text-xs text-center text-gray-500 italic">
                    {cartTotal < 200 ? `Plus que ${(200 - cartTotal).toFixed(2)} DT pour la livraison gratuite !` : '✓ Livraison gratuite incluse'}
                  </p>
                  <button
                    onClick={() => setCheckoutStep('form')}
                    className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition-all shadow-lg"
                  >
                    PASSER LA COMMANDE
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  form="orderForm"
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
                >
                  CONFIRMER MA COMMANDE
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden" style={{ backgroundColor: '#c9a882' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src="/hero_final.jpg"
                alt="Le Vrai Miel Tunisien"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop"
                  alt="Apiculteur"
                  className="rounded-full w-full max-w-md mx-auto shadow-2xl"
                />
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-center font-medium text-white text-sm md:text-base">
                  NOUS SOMMES FIERS DE VOUS PRÉSENTER NOTRE LABORATOIRE
                </p>
                <div className="text-center">
                  <button
                    onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
                    className="text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#4a3728' }}
                  >
                    Découvrir nos produits
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meilleurs Produits</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-center" style={{ color: '#4a3728' }}>
                      {product.name}
                    </h3>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 italic">À partir de</p>
                      <p className="text-2xl font-bold text-amber-500">
                        TND {product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSizes[product.id] === size;
                        return (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className="px-4 py-2 rounded-lg border-2 font-medium transition-colors"
                            style={
                              isSelected
                                ? { backgroundColor: '#4a3728', color: 'white', borderColor: '#4a3728' }
                                : { backgroundColor: 'white', color: '#4a3728', borderColor: '#d1c4b8' }
                            }
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full text-white py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: '#4a3728' }}
                    >
                      AJOUTER AU PANIER
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500 italic">Aucun produit trouvé pour "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#3a2820' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-amber-400">Alsutan</span>
              </h3>
              <p className="text-gray-300 text-sm">
                Le vrai miel tunisien depuis 1998. Qualité certifiée ISO.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:text-amber-400 cursor-pointer">À propos</li>
                <li
                  onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-amber-400 cursor-pointer"
                >
                  Nos produits
                </li>
                <li className="hover:text-amber-400 cursor-pointer">Contact</li>
                <li className="hover:text-amber-400 cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:text-amber-400 cursor-pointer">Miel Pur</li>
                <li className="hover:text-amber-400 cursor-pointer">Miel De Luxe</li>
                <li className="hover:text-amber-400 cursor-pointer">Produits Bio</li>
                <li className="hover:text-amber-400 cursor-pointer">Formules Spéciales</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📧 contact@alsutan.tn</li>
                <li>📞 +216 XX XXX XXX</li>
                <li>📍 Tunis, Tunisie</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-300" style={{ borderColor: '#5a4a3a' }}>
            <p>&copy; 2026 Alsutan. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}