AOS.init({
    duration: 800, // Animation duration in milliseconds
    easing: "ease-in-out", // Easing effect
    once: true, // Whether animation should happen only once
});
function scrollToCard(index) {
    const container = document.getElementById("blog-container");
    const cardWidth = container.children[index].offsetWidth + 20; // Include gap
    container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
    });
}
function scrollll(index) {
    const slider = document.querySelector('.category-slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}


const slider = document.getElementById('slider');
const radioButtons = document.querySelectorAll('.radio-buttons2 input');

radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        const cardWidth = document.querySelector('.category-card').offsetWidth + 10; // Include margin
        slider.style.transform = `translateX(-${cardWidth * index}px)`;
    });
});


// Show or close the user account menu on click
let userAccount = document.querySelector(".fa-bars")
let hamburger = document.querySelector(".user-account")
let xmark = document.querySelector(".fa-x")

userAccount.addEventListener("click", () => {
    hamburger.classList.add("active")

})
xmark.addEventListener("click", () => {
    hamburger.classList.remove("active")
})



let localStorageFunc = () => {
    let localStorageData = localStorage.getItem("cardData")
    if (!localStorageData) {
        return [];
    }
    return localStorageData = JSON.parse(localStorageData)
}
let collectDataFromLS = localStorageFunc();

let updateCartValue = (lsProductData) => {
    let ucd = document.querySelector(".cart-quantity")
    return ucd.innerHTML = `<p class="cart-quantity">${lsProductData.length}</p>`

}
updateCartValue(collectDataFromLS)



const productflex = document.querySelector(".product-flex")
const productTemplate = document.querySelector("#product-template")

async function gateDatafromApi() {
    let apiData = await fetch("http://127.0.0.1:5500/product.json")

    let productApiData = await apiData.json()
    // console.log(productApiData)
    let showDisplayElement = (productApiData) => {
        if (!productApiData) {
            return false;
        }

        productApiData.forEach(element => {
            // console.log(element)

            const { id, src, unit, name, price } = element

            const productClone = document.importNode(productTemplate.content, true)

            productClone.querySelector(".product-card").setAttribute(`id`, `card${id}`);
            productClone.querySelector(".p-name").textContent = name;
            productClone.querySelector(".p-img").src = src;
            productClone.querySelector(".p-unit").textContent = unit;
            productClone.querySelector(".p-price").textContent = `₹${price}`;


            productClone.querySelector(".quantity-container").addEventListener("click", (e) => {
                let stock = 30
                let toggleQuantity = (e, id, stock) => {
                    const getProductUniqeId = document.querySelector(`#card${id}`)
                    // console.log(getProductUniqeId);
                    let getProductQuantity = getProductUniqeId.querySelector(".quantity")
                    // console.log(getProductQuantity);
                    let quantity = parseInt(getProductQuantity.getAttribute("data-quantity")) || 1

                    if (e.target.classList.contains("fa-plus")) {

                        if (quantity < stock) {
                            quantity += 1
                        }
                        else if (quantity === stock) {
                            quantity = stock
                        }

                    }
                    if (e.target.classList.contains("fa-minus")) {
                        if (quantity > 1) {
                            quantity -= 1
                        }
                    }
                    getProductQuantity.innerText = quantity
                    getProductQuantity.setAttribute("data-quantity", quantity.toString())
                    // return quantity

                }
                toggleQuantity(e, id, stock)
            })

            productClone.querySelector(".add-to-cart").addEventListener("click", (e) => {

                let addToCart = (e, id) => {


                    let collectDataFromLS = localStorageFunc();
                    // console.log(collectDataFromLS);                                  
                    const ProductUniqeId = document.querySelector(`#card${id}`)
                    let getQuantityForAddtocart = Number(ProductUniqeId.querySelector(".quantity").innerText)
                    let getPriceForAddtocart = ProductUniqeId.querySelector(".p-price").innerText
                    let getPrice = getPriceForAddtocart.replace("₹", " ");

                    let existingProduct = collectDataFromLS.find((e) => {
                        if (e.id === id) {

                            return true
                        }
                    });
                    if (existingProduct && getQuantityForAddtocart > 1) {

                        getQuantityForAddtocart = Number(existingProduct.getQuantityForAddtocart + getQuantityForAddtocart);
                        getPrice = Number(getQuantityForAddtocart * getPrice);

                        let updateCartData = { id, getQuantityForAddtocart, getPrice }

                        updateExistCartValue = collectDataFromLS.map((e) => {
                            if (e.id === id) {
                                return updateCartData
                            } else {
                                return e
                            }
                        });
                        localStorage.setItem(`cardData`, JSON.stringify(updateExistCartValue))
                    }

                    if (existingProduct) {
                        // alert("This product already exist in your cart")
                        return false

                    }

                    getPrice = getQuantityForAddtocart * getPrice;

                    collectDataFromLS.push({ id, getQuantityForAddtocart, getPrice })
                    localStorage.setItem(`cardData`, JSON.stringify(collectDataFromLS))

                    updateCartValue(collectDataFromLS)
                }
                addToCart(e, id);

            })

            productflex.append(productClone)

        });
    }
    showDisplayElement(productApiData)
}
gateDatafromApi()

