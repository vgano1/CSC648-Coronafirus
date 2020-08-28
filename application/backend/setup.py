from setuptools import setup, find_packages

REQUIREMENTS = [
    # Put requirements here
    'flask==1.1.2',
]

TEST_REQUIREMENTS = [
    # Put package test requirements here
    'pytest==5.3.4',
    'pytest-cov==2.8.1',
]

setup(
    name='api',
    version="0.0.0",
    author='Team 01',
    packages=find_packages(exclude=('tests', 'tests.*', 'docs')),
    install_requires=REQUIREMENTS,
    extras_require = {
        "tests": [TEST_REQUIREMENTS],
    }
)
