


function polutateUFs() { 
   
    const ufSelect = document.querySelector("select[name=uf]") 



    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    
    .then( resposta => resposta.json() )
    .then( states => {

        for( const state of states ){

            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    })
}

polutateUFs()


function getCities (event) {

    const citySelect = document.querySelector("select[name=city]")

    const stateInput = document.querySelector("input[name=state]") 
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( resposta => resposta.json() )
    .then( cities => {


        for( const city of cities ){

            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities )

    
// () => {} isso é a mesma coisa que criar uma função anonima || change significa mudança 

//fetch é um argumento e then é então



// items de coleta
// pegar todos os li's 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const items of itemsToCollect) {

    items.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")
let selectedItems = []

function handleSelectedItem (event) {

    const itemLi = event.target

    // Adicionar ou remover uma classe com js = toggle
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId);
    

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => { 

         const itemFound = item == itemId // isso será true ou false
         return itemFound
    })

    if(alreadySelected >= 0) {
    //se já estiver selecionado, tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemsIsDiffent = item != itemId
            return itemsIsDiffent
        })
        selectedItems = filteredItems      
    } else {
    //se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }   

    // console.log('selectedItems: ', selectedItems);

    // atualizar o campo escondido com os intens selecionados
    
    collectedItems.value = selectedItems
}