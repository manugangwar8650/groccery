// localStorageValue updated with refreshing." 
let localStorageFunc = () => {
    let localStorageData = localStorage.getItem("cardData")
    if (!localStorageData) {
        return [];
    }
    return localStorageData = JSON.parse(localStorageData)
}
let collectDataFromLS = localStorageFunc();


// updateCartValue updated with refreshing." 
let updateCartValue = (lsProductData) => {
    // console.log(lsProductData.length);   
    let ucd = document.querySelector("#cart-value")
    return ucd.innerHTML = `<span id="total-items">${lsProductData.length}</span> Items`
    // console.log(ucd);
}
updateCartValue(collectDataFromLS)


// subTotalValue updated with refreshing."
const productOrderTotal = document.querySelector("#order-total")
const productFinalTotal = document.querySelector("#final-total")
let subTotal = () => {
    let collectDataFromLS = localStorageFunc();
    let initialValue = 0
    return totalPrice = collectDataFromLS.reduce((accumlater, e) => {
        let totalProductPrice = parseInt(e.getPrice)
        return accumlater + totalProductPrice
    }, initialValue)
}
let productSubtotal = subTotal()
productOrderTotal.innerHTML = productSubtotal
productFinalTotal.innerHTML = `${productSubtotal + 50}`



async function gateDatafromApi() {
    let apiData = await fetch("http://127.0.0.1:5500/product.json")

    let productApiData = await apiData.json()



    let filterData = productApiData.filter((apiElement) => {

        return collectDataFromLS.some((lsElement) => {

            if (lsElement.id === apiElement.id) {
                return true
            }

        })

    })
    // console.log(filterData);

    const addtocartproduct = document.querySelector(".add-to-cart-product")
    const templatecartitem = document.querySelector("#template-cart-item")


    let showShopingCartProd = () => {

        filterData.forEach((e) => {

            const { id, src, unit, name, price, sold } = e

            let cloneShopingCartProd = document.importNode(templatecartitem.content, true)


            let lsPriceAndQuantity = (id, price) => {
                let collectDataFromLS = localStorageFunc();

                let existprod = collectDataFromLS.find((lsElement) => {
                    if (lsElement.id === id) {
                        return true
                    }

                })
                let lsquantity = 1
                if (existprod) {
                    lsquantity = existprod.getQuantityForAddtocart
                    price = existprod.getPrice
                    // console.log(lsquantity,price);

                }
                return { lsquantity, price }
            }

            let fetchPriceAndQuantityFromls = lsPriceAndQuantity(id, price)
            // console.log(fetchPriceAndQuantityFromls);

            cloneShopingCartProd.querySelector(".cart-table").setAttribute("id", `cart${id}`);
            cloneShopingCartProd.querySelector(".p-img").src = src
            cloneShopingCartProd.querySelector(".item-price").innerText = fetchPriceAndQuantityFromls.price
            cloneShopingCartProd.querySelector(".quantity-value").innerText = fetchPriceAndQuantityFromls.lsquantity
            cloneShopingCartProd.querySelector(".product-name").innerText = name
            cloneShopingCartProd.querySelector(".product-sold").innerText = sold

            cloneShopingCartProd.querySelector(".quantity").addEventListener("click", (e) => {

                let stock = 30

                let incrementDecrement = (e, id, stock, price) => {
                    let collectDataFromLS = localStorageFunc();

                    const productId = document.querySelector(`#cart${id}`)
                    // console.log(productId)
                    const productQuantity = productId.querySelector(".quantity-value")
                    // console.log(productQuantity);
                    const productPrice = productId.querySelector(".item-price")
                    // console.log(productPrice);
                    // const productOrderTotal = document.querySelector("#order-total")
                    // const productFinalTotal = document.querySelector("#final-total")
                    let lsQuantity = 0
                    let lsPrice = 1


                    let existproduct = collectDataFromLS.find((e) => e.id === id)

                    if (existproduct) {
                        lsQuantity = existproduct.getQuantityForAddtocart
                        lsPrice = existproduct.getPrice

                    }
                    else {
                        lsPrice = price
                        price = price
                    }
                    // console.log(lsquantity,lsPrice)  

                    if (e.target.classList.contains("increase")) {

                        if (lsQuantity < stock) {
                            lsQuantity += 1
                            // lsPrice = price * lsQuantity
                        }
                        else if (lsQuantity === stock) {
                            lsQuantity = stock
                            // lsPrice = price * lsQuantity
                        }

                    }
                    if (e.target.classList.contains("decrease")) {
                        if (lsQuantity > 1) {
                            lsQuantity -= 1
                            // lsPrice = price * lsQuantity
                        }
                    }
                    lsPrice = price * lsQuantity

                    let updateCartData = { id, getQuantityForAddtocart: lsQuantity, getPrice: lsPrice }

                    updateExistCartValue = collectDataFromLS.map((e) => {
                        if (e.id === id) {
                            return updateCartData
                        } else {
                            return e
                        }
                    });
                    localStorage.setItem(`cardData`, JSON.stringify(updateExistCartValue))
                    productQuantity.innerHTML = lsQuantity
                    productPrice.innerHTML = lsPrice


                    let subTotal = () => {
                        let collectDataFromLS = localStorageFunc();
                        let initialValue = 0

                        return totalPrice = collectDataFromLS.reduce((accumlater, e) => {

                            let totalProductPrice = parseInt(e.getPrice)
                            return accumlater + totalProductPrice
                        }, initialValue)
                    }
                    let productSubtotal = subTotal()
                    productOrderTotal.innerHTML = productSubtotal
                    productFinalTotal.innerHTML = `${productSubtotal + 50}`
                }
                incrementDecrement(e, id, stock, price)
            })



            cloneShopingCartProd.querySelector(".fa-trash").addEventListener("click", () => {

                let removeProductFromls = (id) => {

                    let collectDataFromLS = localStorageFunc();

                    collectDataFromLS = collectDataFromLS.filter((lsProduct) => {
                        if (lsProduct.id !== id) {
                            return true
                        }
                    })
                    // console.log(collectDataFromLS)
                    localStorage.setItem(`cardData`, JSON.stringify(collectDataFromLS))

                    let removeProductFromDom = document.querySelector(`#cart${id}`)
                    console.log(removeProductFromDom);
                    if (removeProductFromDom) {
                        removeProductFromDom.remove()
                    }
                    updateCartValue(collectDataFromLS)



                    let subTotal = () => {
                        let collectDataFromLS = localStorageFunc();
                        let initialValue = 0

                        return totalPrice = collectDataFromLS.reduce((accumlater, e) => {

                            let totalProductPrice = parseInt(e.getPrice)
                            return accumlater + totalProductPrice
                        }, initialValue)
                    }
                    let productSubtotal = subTotal()
                    productOrderTotal.innerHTML = productSubtotal
                    productFinalTotal.innerHTML = `${productSubtotal + 50}`
                }

                removeProductFromls(id)


            })

            addtocartproduct.append(cloneShopingCartProd)
        });
    }
    showShopingCartProd()

}
gateDatafromApi()















// // Local Storage Function with Error Handling
// let localStorageFunc = () => {
//     let localStorageData = localStorage.getItem("cardData");
//     if (!localStorageData) {
//         return [];
//     }
//     try {
//         return JSON.parse(localStorageData);
//     } catch (error) {
//         console.error("Error parsing localStorage data:", error);
//         return [];
//     }
// };

// // Fetch Data from Local Storage
// let collectDataFromLS = localStorageFunc();

// // Update Cart Value
// let updateCartValue = (lsProductData) => {
//     let ucd = document.querySelector("#cart-value");
//     if (!ucd) {
//         console.error("Cart value element not found.");
//         return;
//     }
//     ucd.innerHTML = `<span id="total-items">${lsProductData.length}</span> Items`;
// };

// // Initial Update of Cart Value
// updateCartValue(collectDataFromLS);

// // Fetch Data from API
// async function gateDatafromApi() {
//     try {
//         let apiData = await fetch("http://127.0.0.1:5500/product.json");
//         if (!apiData.ok) {
//             throw new Error(`HTTP error! Status: ${apiData.status}`);
//         }
//         let productApiData = await apiData.json();

//         let filterData = productApiData.filter((apiElement) => {
//             return collectDataFromLS.some((lsElement) => lsElement.id === apiElement.id);
//         });

//         const addtocartproduct = document.querySelector(".add-to-cart-product");
//         const templatecartitem = document.querySelector("#template-cart-item");

//         if (!addtocartproduct || !templatecartitem) {
//             console.error("Required DOM elements not found.");
//             return;
//         }

//         // Display Shopping Cart Products
//         let showShopingCartProd = () => {
//             filterData.forEach((e) => {
//                 const { id, src, unit, name, price, sold } = e;

//                 let cloneShopingCartProd = document.importNode(templatecartitem.content, true);

//                 // Get Price and Quantity from Local Storage
//                 let lsPriceAndQuantity = (id, price) => {
//                     let collectDataFromLS = localStorageFunc();

//                     let existprod = collectDataFromLS.find((lsElement) => lsElement.id === id);
//                     let lsquantity = existprod?.getQuantityForAddtocart || 1;
//                     price = existprod?.getPrice || price;

//                     return { lsquantity, price };
//                 };

//                 let fetchPriceAndQuantityFromls = lsPriceAndQuantity(id, price);

//                 // Populate Cloned Product Data
//                 cloneShopingCartProd.querySelector(".cart-table").setAttribute("id", `cart${id}`);
//                 cloneShopingCartProd.querySelector(".p-img").src = src;
//                 cloneShopingCartProd.querySelector(".item-price").innerText = fetchPriceAndQuantityFromls.price;
//                 cloneShopingCartProd.querySelector(".quantity-value").innerText = fetchPriceAndQuantityFromls.lsquantity;
//                 cloneShopingCartProd.querySelector(".product-name").innerText = name;
//                 cloneShopingCartProd.querySelector(".product-sold").innerText = sold;

//                 // Handle Quantity Update
//                 let quantityElement = cloneShopingCartProd.querySelector(".quantity");
//                 if (quantityElement) {
//                     quantityElement.addEventListener("click", (e) => {
//                         let stock = 30;

//                         let incrementDecrement = (e, id, stock, price) => {
//                             let collectDataFromLS = localStorageFunc();

//                             const productQuantity = document.querySelector(`#cart${id} .quantity-value`);
//                             const productPrice = document.querySelector(`#cart${id} .item-price`);
//                             let lsQuantity = 1;
//                             let lsPrice = price;

//                             let existproduct = collectDataFromLS.find((e) => e.id === id);

//                             if (existproduct) {
//                                 lsQuantity = existproduct.getQuantityForAddtocart;
//                                 lsPrice = existproduct.getPrice;
//                             }

//                             if (e.target.classList.contains("increase")) {
//                                 if (lsQuantity < stock) {
//                                     lsQuantity += 1;
//                                     lsPrice = price * lsQuantity;
//                                 }
//                             } else if (e.target.classList.contains("decrease")) {
//                                 if (lsQuantity > 1) {
//                                     lsQuantity -= 1;
//                                     lsPrice = price * lsQuantity;
//                                 }
//                             }

//                             if (productQuantity && productPrice) {
//                                 productQuantity.innerText = lsQuantity;
//                                 productPrice.innerText = lsPrice;
//                             }

//                             let updatedCartData = collectDataFromLS.map((item) =>
//                                 item.id === id ? { ...item, getQuantityForAddtocart: lsQuantity, getPrice: lsPrice } : item
//                             );
//                             localStorage.setItem("cardData", JSON.stringify(updatedCartData));
//                         };

//                         incrementDecrement(e, id, stock, price);
//                     });
//                 }

//                 // Handle Product Removal
//                 cloneShopingCartProd.querySelector(".fa-trash").addEventListener("click", () => {
//                     let removeProductFromls = (id) => {
//                         let collectDataFromLS = localStorageFunc();

//                         let updatedCart = collectDataFromLS.filter((lsProduct) => lsProduct.id !== id);
//                         localStorage.setItem("cardData", JSON.stringify(updatedCart));

//                         let removeProductFromDom = document.querySelector(`#cart${id}`);
//                         if (removeProductFromDom) {
//                             removeProductFromDom.remove();
//                         }
//                         updateCartValue(updatedCart);
//                     };

//                     removeProductFromls(id);
//                 });

//                 addtocartproduct.append(cloneShopingCartProd);
//             });
//         };

//         showShopingCartProd();
//     } catch (error) {
//         console.error("Error fetching or processing API data:", error);
//     }
// }

// gateDatafromApi();

