import React from "react";

const AnyList = require('anylist');


const Anylist = () => {
    const any = new AnyList({email: 'al748x@gmail.com', password: 'Blackpearl808!'})
    any.on('lists-update', lists => {
        console.log('Lists were updated!');
    });
    
    any.login().then(async () => {
        await any.getLists();
        
        // Add new item to the Walmart list
        const walmart = any.getListByName('Walmart');
        
        let chips = any.createItem({name: 'Chips'});
        
        chips = await walmart.addItem(chips)
        
        // Check off added item
        chips.checked = true;
        // And change the quantity
        chips.quantity = '2';
        // Save updated item
        await chips.save();
        
        // Delete item
        await walmart.removeItem(chips);
        
        any.teardown();
    });
    return (
        <div className="Anylist">
            <h1>Hello</h1>
        </div>
    )
}

export default Anylist;