const MODEL_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTM2MHZpZXdlci1wcm90ZWN0ZWQvdDE3NDc5MTYzNDlfMjRkYzU5NjYtYjM0Ni00ODkwLWFlNTgtMmY1ZDI2OTZiNWMyLnJ2dA';

function getForgeToken(callback) {
  fetch('https://Windover-Viewer-Test.herokuapp.com/api/forge/oauth/token')
    .then(res => res.json())
    .then(data => callback(data.access_token, data.expires_in))
    .catch(err => console.error('Token error:', err));
}

Autodesk.Viewing.Initializer({ getAccessToken: getForgeToken }, () => {
  const viewerDiv = document.getElementById('viewer');
  const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv, { extensions: [
    'Autodesk.Viewing.FileModelStructure',
    'Autodesk.Viewing.PropertyPanel',
    'Autodesk.Measure',
    'Autodesk.Section'
  ]});
  viewer.start();

  const documentId = 'urn:' + MODEL_URN;
  Autodesk.Viewing.Document.load(documentId, doc => {
    const defaultModel = doc.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(doc, defaultModel);
  }, err => console.error(err));
});
