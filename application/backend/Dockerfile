FROM tiangolo/uwsgi-nginx-flask:python3.8
COPY . ./app
WORKDIR /app
RUN pip install .
EXPOSE 5000
ENTRYPOINT [ "python" ]
CMD [ "run.py" ]