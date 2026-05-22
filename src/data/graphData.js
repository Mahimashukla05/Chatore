const graph = {

    NIT: {
      "Cafe Chill": 1,
      "Dragon Momos": 2
    },
  
    "Cafe Chill": {
      NIT: 1,
      "Momo Magic": 2
    },
  
    "Dragon Momos": {
      NIT: 2,
      "Biryani Point": 3
    },
  
    "Momo Magic": {
      "Cafe Chill": 2
    },
  
    "Biryani Point": {
      "Dragon Momos": 3
    }
  };
  
  export default graph;