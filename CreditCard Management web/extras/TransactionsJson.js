const transactions = [
    {
        "Date": "1/1/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "5.75",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "2/1/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "52.99",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "3/2/2024",
        "BusinessName": "Dunkin' Donuts",
        "Category": "Food & Beverage",
        "Amount": "4.5",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "5/2/2024",
        "BusinessName": "Walmart",
        "Category": "Retail & Shopping",
        "Amount": "35.2",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "6/2/2024",
        "BusinessName": "Netflix",
        "Category": "Entertainment",
        "Amount": "14.99",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "7/2/2024",
        "BusinessName": "Chipotle",
        "Category": "Food & Beverage",
        "Amount": "11.5",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "10/2/2024",
        "BusinessName": "Apple",
        "Category": "Electronics",
        "Amount": "899.99",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "11/2/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "62.75",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "12/2/2024",
        "BusinessName": "Spotify",
        "Category": "Entertainment",
        "Amount": "9.99",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "13/02/2024",
        "BusinessName": "Best Buy",
        "Category": "Electronics",
        "Amount": "120.45",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "15/02/2024",
        "BusinessName": "McDonald's",
        "Category": "Food & Beverage",
        "Amount": "8.25",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "16/02/2024",
        "BusinessName": "H&M",
        "Category": "Retail & Shopping",
        "Amount": "44.8",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "18/02/2024",
        "BusinessName": "Uber",
        "Category": "Transportation",
        "Amount": "22.9",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "19/02/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "13.59",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "20/02/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "6.95",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "25/3/2024",
        "BusinessName": "Subway",
        "Category": "Food & Beverage",
        "Amount": "7.3",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "5/4/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "65",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "10/4/2024",
        "BusinessName": "Netflix",
        "Category": "Entertainment",
        "Amount": "14.99",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "12/4/2024",
        "BusinessName": "Walmart",
        "Category": "Retail & Shopping",
        "Amount": "20.55",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "17/4/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "45.3",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "22/4/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "5.5",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "25/5/2024",
        "BusinessName": "McDonald's",
        "Category": "Food & Beverage",
        "Amount": "8",
        "cardNumber": "1234123412341230"
    },
    {
        "Date": "7/6/2024",
        "BusinessName": "Best Buy",
        "Category": "Electronics",
        "Amount": "230.25",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "15/6/2024",
        "BusinessName": "Chipotle",
        "Category": "Food & Beverage",
        "Amount": "12.2",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "22/6/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "18.7",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "29/6/2024",
        "BusinessName": "Uber",
        "Category": "Transportation",
        "Amount": "25",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "2/7/2024",
        "BusinessName": "Apple",
        "Category": "Electronics",
        "Amount": "999.99",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "9/7/2024",
        "BusinessName": "Spotify",
        "Category": "Entertainment",
        "Amount": "9.99",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "14/7/2024",
        "BusinessName": "H&M",
        "Category": "Retail & Shopping",
        "Amount": "39.99",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "18/7/2024",
        "BusinessName": "Dunkin' Donuts",
        "Category": "Food & Beverage",
        "Amount": "5",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "22/7/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "61.3",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "30/7/2024",
        "BusinessName": "Chipotle",
        "Category": "Food & Beverage",
        "Amount": "13.4",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "3/8/2024",
        "BusinessName": "Walmart",
        "Category": "Retail & Shopping",
        "Amount": "48.6",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "12/8/2024",
        "BusinessName": "Subway",
        "Category": "Food & Beverage",
        "Amount": "6.5",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "16/8/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "7.75",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "25/8/2024",
        "BusinessName": "Best Buy",
        "Category": "Electronics",
        "Amount": "150",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "1/9/2024",
        "BusinessName": "Apple",
        "Category": "Electronics",
        "Amount": "950",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "5/9/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "22.45",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "10/9/2024",
        "BusinessName": "Netflix",
        "Category": "Entertainment",
        "Amount": "14.99",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "15/9/2024",
        "BusinessName": "Chipotle",
        "Category": "Food & Beverage",
        "Amount": "11.25",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "22/9/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "57.2",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "30/9/2024",
        "BusinessName": "Uber",
        "Category": "Transportation",
        "Amount": "20.5",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "2/10/2024",
        "BusinessName": "Walmart",
        "Category": "Retail & Shopping",
        "Amount": "30",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "9/10/2024",
        "BusinessName": "H&M",
        "Category": "Retail & Shopping",
        "Amount": "49.5",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "15/10/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "6",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "22/10/2024",
        "BusinessName": "Chipotle",
        "Category": "Food & Beverage",
        "Amount": "11.7",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "31/10/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "89.5",
        "cardNumber": "9999999999999999"
    },
    {
        "Date": "5/11/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "40.3",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "10/11/2024",
        "BusinessName": "McDonald's",
        "Category": "Food & Beverage",
        "Amount": "7.9",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "15/11/2024",
        "BusinessName": "Best Buy",
        "Category": "Electronics",
        "Amount": "175.65",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "20/11/2024",
        "BusinessName": "Netflix",
        "Category": "Entertainment",
        "Amount": "14.99",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "25/11/2024",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "5",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "3/12/2024",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "62.2",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "10/12/2024",
        "BusinessName": "Uber",
        "Category": "Transportation",
        "Amount": "24",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "12/12/2024",
        "BusinessName": "Apple",
        "Category": "Electronics",
        "Amount": "899",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "17/12/2024",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "56.8",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "25/12/2024",
        "BusinessName": "McDonald's",
        "Category": "Food & Beverage",
        "Amount": "9.25",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "18/1/2025",
        "BusinessName": "Target",
        "Category": "Retail & Shopping",
        "Amount": "15.9",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "19/1/2025",
        "BusinessName": "Starbucks",
        "Category": "Food & Beverage",
        "Amount": "20.7",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "22/1/2025",
        "BusinessName": "McDonald's",
        "Category": "Food & Beverage",
        "Amount": "40.9",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "25/1/2025",
        "BusinessName": "Amazon",
        "Category": "Retail & Shopping",
        "Amount": "105.9",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "27/1/2025",
        "BusinessName": "Uber",
        "Category": "Transportation",
        "Amount": "20.6",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "1/2/2025",
        "BusinessName": "ruppin",
        "Category": "studies",
        "Amount": "980.7",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "2/2/2025",
        "BusinessName": "ruppin dorms",
        "Category": "studies",
        "Amount": "580.99",
        "cardNumber": "1234567812347890"
    },
    {
        "Date": "29/1/2025",
        "BusinessName": "yellow",
        "Category": "Food & Beverage",
        "Amount": "20.6",
        "cardNumber": "1234567812347890"
    }
]