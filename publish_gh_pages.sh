# Create a temporary directory for publishing your element and cd into it
mkdir temp && cd temp

# Run the gp.sh script. This will allow you to push a demo-friendly
# version of your page and its dependencies to a GitHub pages branch
# of your repository (gh-pages). Below, we pass in a GitHub username
# and the repo name for our element
curl -s https://cdn.rawgit.com/Polymer/tools/b753dfb5/bin/gp.sh | bash -s EdgeVerve oe-data-table

# Finally, clean-up your temporary directory as you no longer require it
cd..
rm -rf temp