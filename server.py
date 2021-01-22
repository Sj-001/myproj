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
<<<<<<< HEAD
        added = False
        if username == "":
            response = {
                "result": "Enter username",
                "added": added
            }
        elif self.nodes.get(username, "None") == "None":
=======
        if self.nodes.get(username, "None") == "None":
>>>>>>> 64e0933d6909e75571be23dcd7c796bd7a9ece6e
            mnemonic = r.random_words(count=10)
            mnemonic = str(mnemonic).translate(
                str.maketrans('', '', string.punctuation))
            self.nodes[username] = {
                "address": str(uuid1()).replace('-', ''),
                "balance": 500,
                "password": mnemonic,
<<<<<<< HEAD
                "notifications": [],
                "active": True
            }
            added = True
            response = {
                "result": mnemonic,
                "added": added
            }

        else:
            response = {
                "result": "Username already exists. Try another.",
                "added": added
            }
        return response

    def add_transaction(self, transaction):
        my_txn = {"Sender": transaction["sender"], "Recipient": transaction["recepient"],
                  "Amount": transaction["amount"], "Fee": transaction["fee"]}

        self.mycol.insert_one(my_txn)

    def transact(self, transaction, password):
        if self.nodes.get(transaction["recipient"], "None") == "None":
            return "Invalid Recipient"
        if self.nodes[transaction["sender"]]["password"] != password:
            return "Wrong Password"
        if self.nodes[transaction["sender"]]["balance"] < int(transaction["amount"]) + int(transaction["fee"]):
            return "Not enough coins!"
        noti = {
            "id": len(self.nodes[transaction["recipient"]]["notifications"]) + 1,
            "info": transaction
        }
        self.nodes[transaction["recipient"]
                   ]["notifications"].append(noti)
        return "Transaction initiated!"

    def accept_transaction(self, noti, password):
        if self.nodes[noti["info"]["recipient"]]["password"] != password:
            return "Wrong password"
        self.nodes[noti["info"]["sender"]
                   ]["balance"] -= int(noti["info"]["amount"])
        self.nodes[noti["info"]["recipient"]
                   ]["balance"] += int(noti["info"]["amount"])
        self.add_transaction(noti["info"])
        self.nodes[noti["info"]["recipient"]
                   ]["notifications"].remove(noti)
        return "Transaction Completed!"

    def reject_transaction(self, noti, password):
        if self.nodes[noti["info"]["recipient"]]["password"] != password:
            return "Wrong password"
        self.nodes[noti["info"]["recipient"]
                   ]["notifications"].remove(noti)
        return "Rejected"

    def login(self, username, KeyPhrase):
        if username == "":
            response = {
                "result": "Enter username",
                "loggedin": False
            }
        if KeyPhrase == "":
            response = {
                "result": "Enter Key Phrase",
                "loggedin": False
            }
        elif self.nodes.get(username, "None") == "None":
            response = {
                "result": "Username doesn't exist.",
                "loggedin": False
            }
        elif self.nodes[username]["active"]:
            response = {
                "result": "Already logged in on some device.",
                "loggedin": False
            }
        elif self.nodes.get(username, "None") != "None" and KeyPhrase != self.nodes[username]["password"]:
            response = {
                "result": "Wrong Key Phrase.",
                "loggedin": False
            }
        else:
            self.nodes[username]["active"] = True
            response = {
                "result": "Log In Successful.",
                "loggedin": True
            }
        return response

    def logout(self, username):
        if self.nodes.get(username, "None") == "None":
            return "Username doesn't exist"
        self.nodes[username]["active"] = False
        return "Logged out!"

    def getstatus(self, username):
        if self.nodes.get(username, "None") == "None":
            return False
        return self.nodes[username]["active"]

    def getbalance(self, username):
        if self.nodes.get(username, "None") == "None":
            return -1
        return self.nodes[username]["balance"]

    def getnoti(self, username):
        if self.nodes.get(username, "None") == "None":
            return []
        return self.nodes[username]["notifications"]


app = Flask(__name__)

blockchain = Blockchain()


@ app.route('/api/add_node', methods=['POST'])
def add_node():
    json = request.get_json()
    response = blockchain.add_node(json['username'])

    return jsonify(response), 201
=======
                "notifications": []
            }
            return mnemonic
>>>>>>> 64e0933d6909e75571be23dcd7c796bd7a9ece6e

        else:
            return "Username already exists. Try another."

<<<<<<< HEAD
@ app.route('/api/transact', methods=['POST'])
def transact():
    json = request.get_json()
    response = blockchain.transact(
        json['transaction'], json['password'])
    return jsonify(response), 201

=======
    def add_transaction(self, transaction):
        my_txn = {"Sender": transaction.sender, "Recipient": transaction.receiver,
                  "Amount": transaction.amount, "Fee": transaction.fee}

        self.mycol.insert_one(my_txn)
>>>>>>> 64e0933d6909e75571be23dcd7c796bd7a9ece6e

@ app.route('/api/getstatus', methods=['POST'])
def getstatus():
    json = request.get_json()
    response = blockchain.getstatus(json["username"])
    return jsonify(response), 201

<<<<<<< HEAD

@ app.route('/api/getbalance', methods=['POST'])
def getbalance():
    json = request.get_json()
    response = blockchain.getbalance(json["username"])
    return jsonify(response), 201


@ app.route('/api/login', methods=['POST'])
def login():
    json = request.get_json()
    response = blockchain.login(json['username'], json['KeyPhrase'])
    return jsonify(response), 201


@ app.route('/api/logout', methods=['POST'])
def logout():
    json = request.get_json()
    response = blockchain.logout(json['username'])
    return jsonify(response), 201


@ app.route('/api/getnoti', methods=['POST'])
def getnoti():
    json = request.get_json()
    response = blockchain.getnoti(json['username'])
    return jsonify(response), 201


@ app.route('/api/accepttxn', methods=['POST'])
def accepttxn():
    json = request.get_json()
    response = blockchain.accept_transaction(
        json['noti'], json['password'])
    return jsonify(response), 201


@ app.route('/api/rejecttxn', methods=['POST'])
def rejecttxn():
    json = request.get_json()
    response = blockchain.reject_transaction(
        json['noti'], json['password'])
    return jsonify(response), 201

=======
app = Flask(__name__)

blockchain = Blockchain()


@ app.route('/api/add_node', methods=['POST'])
def add_node():
    json = request.get_json()
    response = blockchain.add_node(json['username'])

    return jsonify(response), 201

>>>>>>> 64e0933d6909e75571be23dcd7c796bd7a9ece6e

app.run(host='0.0.0.0', port=5000)
