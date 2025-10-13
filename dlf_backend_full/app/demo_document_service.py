def get_demo_documents(property_id: int):
    return [
        {'name': 'Property_Deed.pdf', 'size': '2.1MB', 'type': 'deed', 'url': '/api/documents/demo-download'},
        {'name': 'Tax_Receipt_2024.pdf', 'size': '1.8MB', 'type': 'tax_receipt', 'url': '/api/documents/demo-download'}
    ]
