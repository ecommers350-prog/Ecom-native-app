import { View, Text, TouchableOpacity } from 'react-native'
import React, { useReducer } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import CartItems from '@/components/CartItems'

export default function Cart() {

  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const shipping = 2.00;
  const total = cartTotal + shipping;

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack />

      {cartItems.length > 0 ? (
        <>
          <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false}>
            {cartItems.map((item, index) => (
              <CartItems key={index} item={item}
                onRemove={() => removeFromCart(item.id, item.size)}
                onUpdateQuantity={(q) => updateQuantity(item.id, q, item.size)} />
            ))}
          </ScrollView>

          <View className='p-4 bg-white rounded-t-3xl shadow-sm'>
            {/* Subtotal */}
            <View className='flex-row justify-between mb-2'>
              <Text className='text-black/20'>Subtotal</Text>
              <Text className='text-black font-bold'>${cartTotal.toFixed(2)}</Text>
            </View>

            {/* Shipping */}
            <View className='flex-row justify-between mb-2'>
              <Text className='text-black/20'>Shipping</Text>
              <Text className='text-black font-bold'>${shipping.toFixed(2)}</Text>
            </View>

            {/* Border */}
            <View className='h-[1px] bg-border mb-4' />

            {/* Total */}
            <View className='flex-row justify-between mb-2'>
              <Text className='text-black font-bold text-lg'>Total</Text>
              <Text className='text-black font-bold text-lg'>${total.toFixed(2)}</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity className='bg-black rounded-full py-4 items-center mt-3' onPress={() => router.push('/checkout')}>
              <Text className='text-white font-bold text-base'>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-black/20 text-lg'>Your cart is empty</Text>
          <TouchableOpacity onPress={() => router.push('/')} className='mt-4'>
            <Text className='text-black font-bold'>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}