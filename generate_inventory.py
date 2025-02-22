import json
import os

def generate_inventory():
    inventory_data = [
        {"item": "Cadeiras", "descricao": "Cadeiras plásticas", "quantidade": 50},
        {"item": "Mesas", "descricao": "Mesas dobráveis", "quantidade": 20},
        {"item": "Copos", "descricao": "Copos descartáveis", "quantidade": 200},
        {"item": "Pratos", "descricao": "Pratos descartáveis", "quantidade": 150},
        {"item": "Toalhas", "descricao": "Toalhas de mesa", "quantidade": 10}
    ]
    
    os.makedirs("data", exist_ok=True)
    with open("data/inventory.json", "w", encoding="utf-8") as file:
        json.dump(inventory_data, file, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    generate_inventory()
    print("Arquivo data/inventory.json gerado com sucesso!")
