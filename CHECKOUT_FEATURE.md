# Checkout Feature

## Overview
The checkout feature allows users to review their cart items, select payment methods, and complete their purchase. This implementation follows the Figma designs provided for both desktop and mobile views.

## Key Components

### 1. Checkout Page (`/src/pages/Checkout.tsx`)
- Main checkout page with responsive layout
- Integrates with cart store for item management
- Handles delivery address and payment processing

### 2. CheckoutDeliveryAddress Component
- Displays current delivery address
- Provides "Change" button for address modification
- Responsive design matching Figma specifications

### 3. CheckoutCartSection Component  
- Lists all items from cart grouped by restaurant
- Provides quantity controls for each item
- Shows restaurant branding and "Add item" functionality

### 4. CheckoutPaymentSection Component
- Radio button selection for payment methods (BNI, BRI, BCA, Mandiri)
- Payment summary with itemized costs
- Final "Buy" button to complete purchase

## Features Implemented

### ✅ Desktop Design
- Full-width layout (max 1000px centered)
- Side-by-side arrangement of cart and payment sections
- Proper spacing and typography matching Figma
- Bank logo integration with radio buttons

### ✅ Mobile Responsive Design  
- Stacked vertical layout for mobile screens
- Adjusted font sizes and spacing
- Touch-friendly button sizes
- Maintains visual hierarchy on small screens

### ✅ Cart Integration
- Real-time updates from cart store
- Quantity modification within checkout
- Multiple restaurant support
- Price calculations including fees

### ✅ Payment Methods
- Four supported banks with logos
- Visual radio button selection
- Proper styling matching design system

### ✅ Navigation
- Accessible from cart page via "Checkout" button
- Handles empty cart states gracefully
- Integrates with existing routing system

## Testing the Feature

1. **Add items to cart** - Visit restaurant pages and add menu items
2. **Access checkout** - Click "Checkout" button from cart page or navigate to `/checkout`
3. **Review items** - Verify cart contents display correctly
4. **Modify quantities** - Use +/- controls to adjust item quantities  
5. **Select payment** - Choose from available bank options
6. **Complete purchase** - Click "Buy" button (currently logs to console)

## Assets Used
- Bank logos: `bank-bni.svg`, `bank-bri.svg`, `bank-bca.svg`, `bank-mandiri.svg`
- Location icon: `location-icon.svg` 
- Quantity controls: `add-icon.svg`, `minus-icon.svg`
- Restaurant logos: `restaurant-logo.png`, `restaurant-logo-cart.png`

## Technical Notes
- Uses Zustand for state management
- Implements proper TypeScript types
- Follows existing component patterns
- Maintains consistent styling with design system
- Supports both controlled and uncontrolled component patterns
