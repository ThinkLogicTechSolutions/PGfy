import React from 'react'
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'

import RazorpayCheckout from 'react-native-razorpay';

const RazorPayCheck = () => {
  return (
    <View style={{ display:"flex", justifyContent: 'center', alignItems: 'center', flexDirection:"column"}}>
        <TouchableOpacity style={{backgroundColor:"red", height:40, justifyContent:"center",width:"auto", }}><Text>Click Here</Text></TouchableOpacity>
        <TouchableHighlight style = {{backgroundColor:"green", height:100}} onPress={() => {
            var options = {
                description: 'PGfy Rent Payment',
                image: 'https://res.cloudinary.com/dwt1vmf2u/image/upload/v1730114353/Icon_vp1jef.jpg',
                currency: 'INR',
                key: '<KeyID>',
                amount: '100',
                name: 'PG Monthly Rent Payment',
                order_id: 'order_PxG1LGgvqKhNgZ',
                prefill: {
                    email: 'ralfdsf@example.com',
                    contact: '9191919191',
                    name: 'Abhiram T'
                },
                theme: {color: '#53a20e'}
        }
        RazorpayCheckout.open(options).then((data) => {
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        });
        }}>
            <Text>Click Here</Text>
        </TouchableHighlight>
    </View>
  )
}

export default RazorPayCheck