* Install vs code python extension

* Install autopep8 for formatting

* Create a virtual environment
	python -m venv env

* Activate the environment
	env\Scripts\Activate.ps1 (windows)
	
* Select virtual environment in vs code
	View > Command Palette or (Ctrl+Shift+P)
	select "Python: Select Interpreter"
	select "Enter interpreter path"
	select "Find"
	select venv\Scripts\python.exe
	
* Update pip
	python -m pip install --upgrade pip	
	
* Generate requirements.txt
	pip freeze > requirements.txt
	
Docker build and run

* Navigate to root folder
	docker build -t hello-flask:0.1 .
	docker run -p 5001:5000 -d --name hello-flask-container hello-flask:0.1
	
