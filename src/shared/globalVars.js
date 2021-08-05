//Products Categories & Subcategories
export const COFFEE = 'coffee',
  BEANS = 'beans',
  GROUND = 'ground',
  CAPSULES = 'capsules',
  EQUIP = 'equipment',
  MACHINES = 'machines',
  MANUAL = 'manual',
  GRINDERS = 'grinders',
  ACCS = 'accessorize',
  CUPS = 'cups',
  TOOLS = 'tools';

//Main Pathnames
export const COFFEE_MAIN = `/${COFFEE}`,
  COFFEE_BEANS = `/${COFFEE}/${BEANS}`,
  COFFEE_GROUND = `/${COFFEE}/${GROUND}`,
  COFFEE_CAPSULES = `/${COFFEE}/${CAPSULES}`,
  EQUIP_MAIN = `/${EQUIP}`,
  EQUIP_MACHINES = `/${EQUIP}/${MACHINES}`,
  EQUIP_MANUAL = `/${EQUIP}/${MANUAL}`,
  EQUIP_GRINDERS = `/${EQUIP}/${GRINDERS}`,
  ACCS_MAIN = `/${ACCS}`,
  ACCS_CUPS = `/${ACCS}/${CUPS}`,
  ACCS_TOOLS = `/${ACCS}/${TOOLS}`,
  ABOUT_MAIN = '/about',
  ABOUT_CONTACTS = '/about/contacts',
  ABOUT_PAYMENT = '/about/payment-delivery',
  ABOUT_BUSINESS = '/about/business',
  PROFILE_MAIN = '/profile/:section',
  PROFILE_AUTH = '/profile/auth',
  PROFILE_CONTACTS = '/profile/contacts',
  PROFILE_ADDRESSES = '/profile/addresses',
  PROFILE_ORDERS = '/profile/orders',
  CHECKOUT_MAIN = '/checkout',
  PRODUCT_MAIN = '/product/:id',
  PRODUCT_DYNAMIC = '/product/';

//Product Lists Types
export const CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
  FEATURED = 'featured';

//Names of Product Filters
export const ARABICA = 'arabica',
  SOURNESS = 'sourness',
  STRENGTH = 'strength',
  SWEETNESS = 'sweetness',
  SIZE = 'size',
  PRICE = 'price',
  BRAND = 'brand',
  TYPE = 'type',
  WARRANTY = 'warranty',
  MATERIAL = 'material';
