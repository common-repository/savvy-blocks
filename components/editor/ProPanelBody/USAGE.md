
## Development

first import component to your block

```bash
import  { 
  PanelProSettings
}  from '/components/editor';
```


and use component liek this:

<span style="color:#b9f542">**hasToggle :**</span> True for enable toggle in PanelBody

<span style="color:#b9f542">**checked :**</span> Pass Toggle Default Value

<span style="color:#b9f542">**onChange :**</span> Write The Toggle onChange codes


```bash
<PanelProSettings title="focal point"
    hasToggle={ true }
    checked={ imageSettings?.mask }
    onChange={ ( value ) => {
    setAttributes( { imageSettings: {...imageSettings , mask : value} } )
 } }
   >
```

END;