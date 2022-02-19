# Design spending tracker

Design an app similar to Mint.com

#### We'll scope the problem to handle only the following use cases

* **User** connects to a financial account
* **Service** extracts transactions from the account
    * Updates daily
    * Categorizes transactions
        * Allows manual category override by the user
        * No automatic re-categorization
    * Analyzes monthly spending, by category
* **Service** recommends a budget
    * Allows users to manually set a budget
    * Sends notifications when approaching or exceeding budget
* **Service** has high availability

#### Out of scope

* **Service** performs additional logging and analytics
