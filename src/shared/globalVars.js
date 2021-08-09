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

//Product Properties
export const PROD_ARABICA = 'arabica',
  PROD_SOURNESS = 'sourness',
  PROD_STRENGTH = 'strength',
  PROD_SWEETNESS = 'sweetness',
  PROD_SIZE = 'size',
  PROD_SIZE_M = 'medium',
  PROD_PRICE = 'price',
  PROD_BRAND = 'brand',
  PROD_TYPE = 'type',
  PROD_WARRANTY = 'warranty',
  PROD_MATERIAL = 'material',
  PROD_ID = 'id',
  PROD_TITLE = 'title',
  PROD_IMG = 'img',
  PROD_DECS = 'description',
  PROD_CATEGORY = 'category',
  PROD_SUBCATEGORRY = 'subcategory';

//Actions
export const ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete';

//Modal Types
export const CART = 'cart',
  FORM = 'form',
  ERROR = 'error';

//User Data Type
export const USER_CONTACTS = 'contacts',
  USER_ADDRESSES = 'addresses';

//Delivery Mwthods
export const DELIVERY_METHOD_1 = 'courier',
  DELIVERY_METHOD_2 = 'post office';

// Input Value Types
export const NAME_INPUT = 'name',
  EMAIL_INPUT = 'email',
  PHONE_INPUT = 'phone',
  PASSWORD_INPUT = 'password',
  CITY_INPUT = 'city',
  ADDRESS_INPUT = 'address',
  POSTCODE_INPUT = 'postalCode',
  PRICE_INPUT = 'price';

//UI Styles
export const BTN_DARK = 'btnDark',
  BTN_SEMILIGHT = 'btnSemilight',
  BTN_MAIN = 'btnMain',
  CARD_DARK = 'cardDark';

// Local Storage Names
export const TOKEN = 'token',
  EXP_DATE = 'expirationDate',
  USER_ID = 'userId';
