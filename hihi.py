# Module 2 - Create a Cryptocurrency

# To be installed:
# Flask==0.12.2: pip install Flask==0.12.2
# Postman HTTP Client: https://www.getpostman.com/
# requests==2.18.4: pip install requests==2.18.4

# Importing the libraries
import datetime
import hashlib
import json
import string
from flask import Flask, jsonify, request
import requests
import pymongo
from uuid import uuid1
from urllib.parse import urlparse
from random_words import RandomWords
r = RandomWords()


class Blockchain:

    def __init__(self):
        self.myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        self.mydb = self.myclient["mempool"]
        self.mycol = self.mydb["transactions"]
        self.chain = []
        self.create_block(proof=1, previous_hash='0', transactions=[])
        self.nodes = dict()

    def create_block(self, proof, previous_hash, transactions):
        block = {'index': len(self.chain) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'previous_hash': previous_hash,
                 'transactions': transactions}
        self.chain.append(block)
        return block

    def get_previous_block(self):
        return self.chain[-1]

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while check_proof is False:
            hash_operation = hashlib.sha256(
                str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] == '0000':
                check_proof = True
            else:
                new_proof += 1
        return new_proof

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def is_chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != self.hash(previous_block):
                return False
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(
                str(proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] != '0000':
                return False
            previous_block = block
            block_index += 1
        return True

    def add_node(self, username):
        if self.nodes.get(username, "None") == "None":
            mnemonic = r.random_words(count=10)
            mnemonic = str(mnemonic).translate(
                str.maketrans('', '', string.punctuation))
            self.nodes[username] = {
                "address": str(uuid1()).replace('-', ''),
                "balance": 500,
                "password": mnemonic,
                "notifications": []
            }
            return mnemonic

        else:
            return "Username already exists. Try another."

    def add_transaction(self, transaction):
        my_txn = {"Sender": transaction.sender, "Recipient": transaction.receiver,
                  "Amount": transaction.amount, "Fee": transaction.fee}

        self.mycol.insert_one(my_txn)


app = Flask(__name__)

blockchain = Blockchain()


@ app.route('/api/add_node', methods=['POST'])
def add_node():
    json = request.get_json()
    response = blockchain.add_node(json['username'])

    return jsonify(response), 201


app.run(host='0.0.0.0', port=5000)
