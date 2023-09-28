
class QRCodeError(Exception):
    """
    QR code was not found
    """
    pass

class NamesDetectionError(Exception):
    """
    Error while detecting names
    """
    pass