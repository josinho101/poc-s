## DirectoryCatalog

The following example creates a DirectoryCatalog object that searches the directory the application runs from for parts. It uses a simple import to test the catalog. To fulfill this import, a DLL in the directory must have a matching export.

Package reference
````xml
<PackageReference Include="System.ComponentModel.Composition" Version="5.0.0" />
````
Sample code
```c#
DirectoryCatalog catalog = new DirectoryCatalog(AppDomain.CurrentDomain.BaseDirectory, "SomeLibrary.dll");
CompositionContainer container = new CompositionContainer(catalog);
container.ComposeParts(this);
```
