
// 0. CREATING PRODUCTS
// this part hard codes the products:
// their ids, their name, their price and by default their quantity to 0.
let products = [
    {
        id: 1,
        name: "Milk",
        price: 200,
        qty: 0,
    },
    {
        id: 2,
        name: "Eggs",
        price: 30,
        qty: 0,
    },
    {
        id: 3,
        name: "Bread",
        price: 100,
        qty: 0,
    },
    {
        id: 4,
        name: "Cake",
        price: 600,
        qty: 0,
    },
    {
        id: 5,
        name: "Chocolate",
        price: 60,
        qty: 0,
    },
]


















// 0. SHOW LISTING OF PRODUCTS (IN CONSOLE)

console.log("Please select your product to add in cart:\n");
products.forEach((product) => {
    console.log(product.id + ". " + product.name + " .......................... Rs." + product.price);
});

















let contShopping = true; // a var called continue shopping? By default set to true. It will be set to false when the user says "no" to the continue shopping question. When that happens, the contShopping while code block will exit and proceed to the next code which is to print bill.
let billing = false; //


//The while loop contShopping will run as long as we have contShopping true. As soon as its false, it will exit out of this while loop code block.
while(contShopping){

    // While loop for taking input and validating input id.
    // Set to true so that it can keep repeating itself. The exit condition is mentioned at the end of this code block with "break;".
    while(true){

        // 1. Take Input ID
        let inputId = prompt("Enter Product ID:");
        let getId = parseInt(inputId);
        let findedProduct = products.find(value => {
            return value.id === getId;
        });



        // 2. VALIDATE INPUT ID
        // found:
        if(findedProduct !== undefined){
            console.log(`%c${findedProduct.name + " (Selected)"}`, 'font-weight: bold;');
            // 3. Enter Qty
            let getQty = prompt("Enter quantity:");

            //if empty, or cancelled, stop shopping and print bill.
            if (getQty === null || getQty === "") {
                billing = true;
                contShopping = false;
                break;
            }

            //Uses reduce array helper method to accumulate the quantities entered to put the total quantities in the final bill.
            let quantity = parseInt(getQty);
            if (!isNaN(quantity)) {
                // Use reduce to accumulate quantities
                let totalQuantity = products.reduce((acc, product) => {
                    if (product.id === getId) {
                        product.qty += quantity;
                    }
                    return acc + product.qty;
                }, 0);

                // but prints the user entered qty (not the accumulated one) when prompted to enter qty. The accumulated qty is only posted when printing the bill.
                console.log(findedProduct.name + ': ' + quantity + ' quantity');
            }


            // 4. Continue?
            while(true){
            
                let contPrompt = prompt("Do you want to continue?\nType yes or no");
                
                //if "no", stop shopping and print bill.
                if (contPrompt.toLowerCase() === "no" || contPrompt === null || contPrompt === "") {
                    billing = true;
                    contShopping = false; // Put flag to false to exit the outer loop.
                    break;
                }

                // if "yes", continue shopping and show the listing in console again.
                else if (contPrompt.toLowerCase() === "yes"){
                    contShopping = true;
                    // 0. SHOW LISTING OF PRODUCTS (IN CONSOLE)
                    console.log("Please select your product to add in cart:\n")
                    products.forEach((product) => {
                        console.log(product.id + ". " + product.name + " .......................... Rs." + product.price);
                    });
                    break;
                    
                }

                // if entered anything other than blank, yes, or no, give alert of error, wrong input. Since we're in a while loop and none of the above break conditions were matched
                else{
                    alert("Error! Please enter either yes or no only.")
                }
            }

            break; //breaks out of the validate input ID block in either case of "yes" or "no".
            // and then checks the remaining "else if" and "else".
        }

        // if id is blank or cancelled, stop shopping and print bill.
        else if(inputId === "" || inputId === null){
            billing = true;
            contShopping = false;
            break;
        }

        // Give alert if invalid product ID:
        else{
            alert("Invalid product selected. Please try again!");
        }

    }


}






// Print the bill. If billing will only run when the boolean value of bill is "true".
// Which happens in following cases:
// a. if the id is entered blank or cancelled.
// b. if qty is entered blank or cancelled.
// c. if user says "no" to continue shopping.
if (billing){
    console.log(`%c${"Thanks for shopping with us!\nYour Bill:"}`, 'color: green; font-weight: bold;');

    // Filter products with non-zero quantities
    const filteredProducts = products.filter((product) => product.qty > 0);

    // Loop through the filtered products and print each one
    filteredProducts.forEach((product) => {
        console.log(`${product.name} x ${product.qty}, Price per unit: Rs.${product.price}/-`);
    });

    // Using reduce array helper method to reduce the qty and prices of items into one, for printing.
    const totalPrice = products.reduce((total, current) => {
        const itemPrice = current.price * current.qty;
        return total + itemPrice;
      }, 0);
    console.log(`%c${`Total Price: Rs.${totalPrice}/-`}`, 'color: green; font-weight: bold;');
}

